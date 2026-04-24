// Video Call System - Supports 1-on-1 and Group Calls
let peer = null;
let localStream = null;
let activeCalls = new Map();
let isMuted = false;
let isCameraOff = false;
let videoInitialized = false;
let isGroupCall = false;
let selectedMembers = new Set();
let callsBlocked = false;

function isHTTPS() {
  return location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
}

function showError(message) {
  alert(message);
}

function isCallsBlocked() {
  return sessionStorage.getItem('callsBlocked') === 'true';
}

function setCallsBlocked(blocked) {
  callsBlocked = blocked;
  sessionStorage.setItem('callsBlocked', blocked ? 'true' : 'false');
  updateBlockToggleUI();
}

function updateBlockToggleUI() {
  const toggle = document.getElementById('blockCallsToggle');
  const container = document.querySelector('.calls-block-toggle');
  
  if (toggle) {
    toggle.checked = callsBlocked;
  }
  
  if (container) {
    if (callsBlocked) {
      container.classList.add('blocked');
    } else {
      container.classList.remove('blocked');
    }
  }
}

async function initVideoCall() {
  if (!isHTTPS()) {
    console.log('Video calls require HTTPS');
    document.getElementById('videoCallBtn').style.display = 'none';
    return;
  }
  
  if (videoInitialized) return;
  
  // Check if ScaleDrone is available
  if (!window.drone) {
    console.log('ScaleDrone not configured - video calls disabled');
    document.getElementById('videoCallBtn').style.display = 'none';
    return;
  }
  
  videoInitialized = true;
  
  const droneReady = await waitForDrone();
  if (!droneReady) {
    console.log('ScaleDrone not ready yet');
    videoInitialized = false;
    return;
  }
  
  // Get client ID from ScaleDrone
  const droneClientId = window.drone._containerId || window.drone.clientId;
  if (!droneClientId) {
    console.log('ScaleDrone client ID not available');
    videoInitialized = false;
    return;
  }
  
  const peerId = 'onlylessons-' + droneClientId;
  console.log('Initializing PeerJS with ID:', peerId);
  
  peer = new Peer(peerId, {
    debug: 1,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    }
  });

  peer.on('open', (id) => {
    console.log('Video peer connected:', id);
  });

  peer.on('call', (call) => {
    console.log('Incoming video call from:', call.peer);
    
    if (isCallsBlocked()) {
      console.log('Calls are blocked, rejecting call from:', call.peer);
      call.close();
      return;
    }
    
    const callerId = call.peer.replace('onlylessons-', '');
    
    getUsernameById(callerId).then((callerName) => {
      document.getElementById('callerName').textContent = `Video call from ${callerName || 'Unknown'}`;
    });
    
    document.getElementById('incomingCallModal').classList.add('show');

    document.getElementById('acceptCall').onclick = async () => {
      document.getElementById('incomingCallModal').classList.remove('show');
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.getElementById('localVideo').srcObject = localStream;
        
        isGroupCall = false;
        activeCalls.set(call.peer, call);
        
        call.answer(localStream);
        setupVideoCallHandlers(call);
        
        document.getElementById('videoModal').classList.add('show');
        document.getElementById('callStatus').textContent = 'Connected';
        updateVideoContainerLayout();
      } catch (err) {
        showCameraError(err);
      }
    };

    document.getElementById('declineCall').onclick = () => {
      document.getElementById('incomingCallModal').classList.remove('show');
      call.close();
    };
  });

  peer.on('error', (err) => {
    console.error('Video Peer error:', err.type, err);
    if (err.type === 'unavailable-id') {
      videoInitialized = false;
      setTimeout(initVideoCall, 2000);
    }
  });
}

async function waitForDrone(maxWait = 10000) {
  const startTime = Date.now();
  // ScaleDrone doesn't expose clientId directly on the object, wait for connection
  while (!window.drone || !window.drone._containerId) {
    if (Date.now() - startTime > maxWait) {
      console.log('Timeout waiting for ScaleDrone');
      return false;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  return true;
}

async function getUsernameById(clientId) {
  try {
    const r = await fetch(`/api/whois?ids=${encodeURIComponent(clientId)}`, {
      credentials: 'include',
    });
    const data = await r.json();
    if (data.users && data.users[clientId]) {
      return data.users[clientId];
    }
  } catch (e) {
    console.error('Error getting username:', e);
  }
  return null;
}

function setupVideoCallHandlers(call) {
  const peerId = call.peer;
  let hasStream = false;
  let timeoutHandled = false;
  
  // Timeout to detect blocked calls (no response in 8 seconds)
  setTimeout(() => {
    if (!hasStream && !timeoutHandled && activeCalls.has(peerId)) {
      timeoutHandled = true;
      console.log('Call timeout - peer may have blocked calls:', peerId);
      activeCalls.delete(peerId);
      removeRemoteVideo(peerId);
      updateParticipantCount();
      showBlockedCallMessage(peerId);
      
      // If no more active calls, close the video modal
      if (activeCalls.size === 0) {
        document.getElementById('videoModal').classList.remove('show');
        if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
          localStream = null;
        }
      }
    }
  }, 8000);
  
  call.on('stream', (stream) => {
    console.log('Received remote video stream from:', peerId);
    hasStream = true;
    addRemoteVideo(peerId, stream);
    updateParticipantCount();
  });

  call.on('close', () => {
    if (!hasStream && !timeoutHandled) {
      timeoutHandled = true;
      console.log('Call closed without stream from:', peerId);
      activeCalls.delete(peerId);
      removeRemoteVideo(peerId);
      updateParticipantCount();
      showBlockedCallMessage(peerId);
      
      if (activeCalls.size === 0) {
        document.getElementById('videoModal').classList.remove('show');
        if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
          localStream = null;
        }
      }
    }
  });

  call.on('error', (err) => {
    console.error('Video call error from', peerId, ':', err);
    if (!hasStream && !timeoutHandled) {
      timeoutHandled = true;
      activeCalls.delete(peerId);
      removeRemoteVideo(peerId);
      updateParticipantCount();
      showBlockedCallMessage(peerId);
      
      if (activeCalls.size === 0) {
        document.getElementById('videoModal').classList.remove('show');
      }
    }
  });
}

function addRemoteVideo(peerId, stream) {
  let container = document.getElementById('remoteVideosContainer');
  
  let wrapper = document.getElementById('remote-' + peerId);
  if (!wrapper) {
    wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper remote';
    wrapper.id = 'remote-' + peerId;
    
    const video = document.createElement('video');
    video.autoplay = true;
    video.playsInline = true;
    
    const label = document.createElement('span');
    label.className = 'video-label';
    label.id = 'label-' + peerId;
    
    wrapper.appendChild(video);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
    
    getUsernameById(peerId.replace('onlylessons-', '')).then((name) => {
      label.textContent = name || 'User';
    });
  }
  
  wrapper.querySelector('video').srcObject = stream;
  wrapper.style.display = 'block';
}

function removeRemoteVideo(peerId) {
  const wrapper = document.getElementById('remote-' + peerId);
  if (wrapper) {
    wrapper.remove();
  }
}

function updateParticipantCount() {
  const countEl = document.getElementById('participantCount');
  const count = activeCalls.size + 1;
  countEl.textContent = `${count} participant${count > 1 ? 's' : ''}`;
}

function updateVideoContainerLayout() {
  const container = document.getElementById('videoContainer');
  container.classList.remove('single-call', 'group-call');
  
  if (isGroupCall || activeCalls.size > 1) {
    container.classList.add('group-call');
  } else if (activeCalls.size === 1) {
    container.classList.add('single-call');
  }
}

function showCameraError(err) {
  console.error('Camera/Mic error:', err);
  let message = 'Could not access camera/microphone.\n\n';
  
  if (!isHTTPS()) {
    message += 'Video calls require HTTPS.\nThis site must use https:// for video calls to work.';
  } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
    message += 'Permission denied.\nClick the camera/lock icon in your browser address bar and allow camera and microphone.';
  } else if (err.name === 'NotFoundError') {
    message += 'No camera/microphone found.\nPlease connect a camera or use a device with one.';
  } else if (err.name === 'NotReadableError') {
    message += 'Camera/microphone is already in use.\nClose other apps using your camera.';
  } else {
    message += 'Error: ' + err.message;
  }
  
  showError(message);
}

function showBlockedCallMessage(peerId) {
  const targetName = peerId.replace('onlylessons-', '');
  getUsernameById(targetName).then((name) => {
    showError(`Could not call ${name || 'user'}.\n\nThis person has incoming calls blocked.\n\nIf you want to call them, ask them to turn off "Block Calls" in the chat settings.`);
  });
}

function showSomeBlockedMessage(count) {
  showError(`${count} person${count > 1 ? 's have' : ' has'} their calls blocked.\n\nAsk them to turn off "Block Calls" in the chat settings.`);
}

async function startVideoCall(targetMember) {
  if (!peer) {
    showError('Video call system not ready. Please wait and try again.');
    return;
  }

  const targetClientId = targetMember?.id;
  if (!targetClientId) {
    showError('Could not identify target user.');
    return;
  }

  const targetPeerId = 'onlylessons-' + targetClientId;
  
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById('localVideo').srcObject = localStream;
    
    isGroupCall = false;
    activeCalls.clear();
    document.getElementById('remoteVideosContainer').innerHTML = '';
    
    console.log('Calling peer:', targetPeerId);
    const call = peer.call(targetPeerId, localStream);
    activeCalls.set(targetPeerId, call);
    
    setupVideoCallHandlers(call);
    
    document.getElementById('videoModal').classList.add('show');
    document.getElementById('callStatus').textContent = 'Calling...';
    document.getElementById('callPartner').textContent = targetPeerId;
    document.getElementById('userSelectModal').classList.remove('show');
    updateVideoContainerLayout();
    updateParticipantCount();
  } catch (err) {
    showCameraError(err);
  }
}

async function startGroupVideoCall() {
  if (selectedMembers.size === 0) {
    showError('Please select at least one person to call.');
    return;
  }
  
  if (!peer) {
    showError('Video call system not ready. Please wait and try again.');
    return;
  }

  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById('localVideo').srcObject = localStream;
    
    isGroupCall = true;
    activeCalls.clear();
    document.getElementById('remoteVideosContainer').innerHTML = '';
    
    let callCount = 0;
    const total = selectedMembers.size;
    
    for (const member of selectedMembers) {
      const targetPeerId = 'onlylessons-' + member.id;
      console.log('Calling peer:', targetPeerId);
      
      const call = peer.call(targetPeerId, localStream);
      activeCalls.set(targetPeerId, call);
      setupVideoCallHandlers(call);
      callCount++;
    }
    
    document.getElementById('videoModal').classList.add('show');
    document.getElementById('callStatus').textContent = `Calling ${total} people...`;
    document.getElementById('callPartner').textContent = '';
    document.getElementById('userSelectModal').classList.remove('show');
    updateVideoContainerLayout();
    updateParticipantCount();
  } catch (err) {
    showCameraError(err);
  }
}

function endVideoCall() {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  
  for (const [peerId, call] of activeCalls) {
    call.close();
  }
  activeCalls.clear();
  
  document.getElementById('localVideo').srcObject = null;
  document.getElementById('remoteVideosContainer').innerHTML = '';
  document.getElementById('videoModal').classList.remove('show');
  document.getElementById('userSelectModal').classList.remove('show');
  document.getElementById('callStatus').textContent = 'Connecting...';
  document.getElementById('callPartner').textContent = '';
  document.getElementById('participantCount').textContent = '';
  
  isMuted = false;
  isCameraOff = false;
  isGroupCall = false;
  selectedMembers.clear();
  updateVideoButtons();
  updateVideoContainerLayout();
}

function toggleMute() {
  if (localStream) {
    isMuted = !isMuted;
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !isMuted;
    });
    updateVideoButtons();
  }
}

function toggleCamera() {
  if (localStream) {
    isCameraOff = !isCameraOff;
    localStream.getVideoTracks().forEach(track => {
      track.enabled = !isCameraOff;
    });
    updateVideoButtons();
  }
}

function updateVideoButtons() {
  const muteBtn = document.getElementById('muteBtn');
  const cameraBtn = document.getElementById('cameraBtn');
  
  if (isMuted) {
    muteBtn.classList.add('active');
    muteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4-.17v-5.33l-4.5 4.5h-2.84c.26.58.42 1.21.42 1.88 0 2.21-.72 4.23-1.92 5.73.37.12.77.18 1.18.18.94 0 1.78-.26 2.49-.7l.89.89c.52.52 1.2.81 1.94.81 1.4 0 2.63-.81 3.06-1.95l1.08.91zM12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/></svg>';
  } else {
    muteBtn.classList.remove('active');
    muteBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/></svg>';
  }
  
  if (isCameraOff) {
    cameraBtn.classList.add('active');
    cameraBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18L19.73 21 21 19.73 3.27 2z"/></svg>';
  } else {
    cameraBtn.classList.remove('active');
    cameraBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>';
  }
}

function populateVideoUserList() {
  const userList = document.getElementById('userList');
  const members = window.getMembers?.() || [];
  const myClientId = window.drone?._containerId || window.drone?.clientId;
  const isGroupMode = document.getElementById('groupCallToggle')?.checked;
  
  userList.innerHTML = '';
  selectedMembers.clear();
  
  if (members.length === 0) {
    userList.innerHTML = '<p style="color: rgba(135, 206, 235, 0.5); text-align: center; padding: 20px;">No other users online</p>';
    return;
  }
  
  let hasUsers = false;
  
  members.forEach(async (member) => {
    if (member.id === myClientId) return;
    
    hasUsers = true;
    const username = await getUsernameById(member.id) || 'Unknown';
    
    const userItem = document.createElement('div');
    userItem.className = 'user-item';
    if (isGroupMode) {
      userItem.classList.add('group-call-mode');
    }
    
    userItem.innerHTML = `
      <input type="checkbox" data-member-id="${member.id}">
      <div class="user-avatar">${username.charAt(0).toUpperCase()}</div>
      <span class="user-name">${username}</span>
    `;
    
    if (isGroupMode) {
      const checkbox = userItem.querySelector('input');
      checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          selectedMembers.add(member);
          userItem.classList.add('selected');
        } else {
          selectedMembers.delete(member);
          userItem.classList.remove('selected');
        }
        updateGroupButton();
      });
      userItem.onclick = (e) => {
        if (e.target.type !== 'checkbox') {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      };
    } else {
      userItem.onclick = () => startVideoCall(member);
    }
    
    userList.appendChild(userItem);
  });
  
  if (!hasUsers) {
    userList.innerHTML = '<p style="color: rgba(135, 206, 235, 0.5); text-align: center; padding: 20px;">No other users online</p>';
  }
  
  updateGroupButton();
}

function updateGroupButton() {
  const groupBtn = document.getElementById('startGroupCall');
  const count = selectedMembers.size;
  
  if (count > 0) {
    groupBtn.style.display = 'block';
    groupBtn.textContent = `Call ${count} Participant${count > 1 ? 's' : ''}`;
    groupBtn.disabled = false;
  } else {
    groupBtn.style.display = 'none';
  }
}

// HTTPS Badge
function updateHTTPSBadge() {
  const badge = document.getElementById('httpsBadge');
  if (isHTTPS()) {
    badge.className = 'https-badge active';
    badge.title = 'Video calls enabled (HTTPS)';
  } else {
    badge.className = 'https-badge inactive';
    badge.title = 'Video calls require HTTPS';
  }
}
updateHTTPSBadge();

// Event Listeners
document.getElementById('videoCallBtn').addEventListener('click', () => {
  if (!isHTTPS()) {
    showError('Video calls require HTTPS.\nPlease access this site using https://');
    return;
  }
  populateVideoUserList();
  document.getElementById('userSelectModal').classList.add('show');
});

document.getElementById('closeUserSelect').addEventListener('click', () => {
  document.getElementById('userSelectModal').classList.remove('show');
});

document.getElementById('groupCallToggle').addEventListener('change', (e) => {
  const userList = document.getElementById('userList');
  const groupBtn = document.getElementById('startGroupCall');
  
  if (e.target.checked) {
    userList.classList.add('group-call-mode');
    groupBtn.style.display = 'none';
  } else {
    userList.classList.remove('group-call-mode');
    groupBtn.style.display = 'none';
    selectedMembers.clear();
  }
  
  populateVideoUserList();
});

document.getElementById('startGroupCall').addEventListener('click', startGroupVideoCall);

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('muteBtn').addEventListener('click', toggleMute);
  document.getElementById('cameraBtn').addEventListener('click', toggleCamera);
  document.getElementById('endCallBtn').addEventListener('click', endVideoCall);

  // Block calls toggle
  var blockToggle = document.getElementById('blockCallsToggle');
  if (blockToggle) {
    blockToggle.addEventListener('change', function(e) {
      setCallsBlocked(e.target.checked);
    });
  }

  // Initialize block toggle UI
  callsBlocked = isCallsBlocked();
  updateBlockToggleUI();

  // Initialize video when drone is ready
  setTimeout(initVideoCall, 3000);
});

console.log('Video call system loaded (Group Call enabled)');
