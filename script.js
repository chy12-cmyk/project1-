let postCount = 1; // 게시글 고유 ID를 위한 변수

// 새 글 올리기 함수
function addPost() {
    const authorName = document.getElementById('authorName').value;
    const postText = document.getElementById('postText').value;
    const imageFile = document.getElementById('postImage').files[0];

    // 필수 입력값 확인
    if (!authorName || !postText) {
        alert('이름과 내용을 모두 입력해주세요!');
        return;
    }

    const board = document.getElementById('board');
    const newPost = document.createElement('div');
    newPost.className = 'post';

    // 이미지가 첨부되었을 경우 미리보기를 생성하는 로직
    let imageHTML = '';
    if (imageFile) {
        const imageUrl = URL.createObjectURL(imageFile);
        imageHTML = `<img src="${imageUrl}" class="post-image" alt="업로드된 사진">`;
    }

    // 새 게시글의 HTML 구조 생성
    newPost.innerHTML = `
        <div class="post-header">${authorName}</div>
        <div class="post-content">${postText}</div>
        ${imageHTML}
        <div class="comments-section" id="comments-${postCount}"></div>
        <div class="comment-input-wrapper">
            <input type="text" id="comment-input-${postCount}" placeholder="의견을 남겨주세요...">
            <button onclick="addComment(${postCount})">등록</button>
        </div>
    `;

    // 새로운 글을 게시판 맨 위에 추가
    board.insertBefore(newPost, board.firstChild);

    // 입력 폼 초기화 (다음 글 작성을 위해)
    document.getElementById('authorName').value = '';
    document.getElementById('postText').value = '';
    document.getElementById('postImage').value = '';
    
    postCount++;
}

// 댓글(의견) 달기 함수
function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const commentText = commentInput.value;

    if (!commentText) {
        alert('의견 내용을 입력해주세요!');
        return;
    }

    const commentsSection = document.getElementById(`comments-${postId}`);
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    
    // 댓글은 익명으로 표시됩니다.
    newComment.innerHTML = `<b>익명:</b> ${commentText}`;
    
    commentsSection.appendChild(newComment);
    
    // 입력창 초기화
    commentInput.value = '';
}