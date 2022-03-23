async function newFormHandler(event) {
   event.preventDefault();

   const title = document.querySelector('input[name="post-title"]').value;
   const postContent = document.querySelector('input[name="post-content"]').value;

   const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
         title,
         post_content: postContent,
      }),
      headers: {
         'Content-Type': 'application/json',
      },
   });

   if (response.ok) {
      document.location.replace('/dashboard');
   } else {
      const { message } = await response.json();
      alert(message);
   }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
