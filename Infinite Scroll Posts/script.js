const postContainer = document.querySelector(".post-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");
let limit = 5;
let page = 1;

//----------------------------Functions------------------------------

// Fetch the posts
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data2 = await res.json();

  return data2;
}

// display the posts
async function displayPosts() {
  const res = await getPosts();

  res.forEach((data) => {
    const post = document.createElement("div");
    post.classList.add("post");
    post.innerHTML = `<div class="number">${data.id}</div>
        <div class="post-info">
          <h2 class="post-title">${data.title}</h2>
          <p class="post-body">${data.body}
          </p>
        </div>
      </div>`;
    postContainer.appendChild(post);
  });
}

// Showing loading and next posts
async function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      limit = 5;
      displayPosts();
    }, 300);
  }, 2000);
}

// Filtering posts on change of input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}
// -------------------------Event Listener----------------------------

window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 8) {
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);

displayPosts();
