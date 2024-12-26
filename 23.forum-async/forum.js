const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";
const forumTopicUrl = "https://forum.freecodecamp.org/t/";
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

const postsContainer = document.getElementById('posts-container');
//object which holds all of the forum categories
const allCategories = {
  299: { category: "Career Advice", className: "career" },
  409: { category: "Project Feedback", className: "feedback" },
  417: { category: "freeCodeCamp Support", className: "support" },
  421: { category: "JavaScript", className: "javascript" },
  423: { category: "HTML - CSS", className: "html-css" },
  424: { category: "Python", className: "python" },
  432: { category: "You Can Do This!", className: "motivation" },
  560: { category: "Backend Development", className: "backend" },
};

//a function to retrieve the category name from the allCategories object
const forumCategory = (id) => {
  //used to store the category name and class name for each category
  let selectedCategory = {};
  if (allCategories.hasOwnProperty(id)) {
    const { className , category } = allCategories[id];
    selectedCategory.className = className;
    selectedCategory.category = category;
  } else {
    selectedCategory.className = "general";
    selectedCategory.category = "General";
    selectedCategory.id = 1;
  }
  //every category will have a URL that points to the category on the freeCodeCamp forum.
  const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`;
  //display the name of the category in the anchor element
  const linkText = selectedCategory.category;
  //apply styles for the anchor element
  const linkClass = `category ${selectedCategory.className}`;
  return `<a href="${url}" class="${linkClass}" target="_blank">${linkText}</a>`;
};

// how much time has passed since a topic had any activity
const timeAgo = (time) =>{
  //represents the current date and time
  const currentTime = new Date();
  //the date of the last activity on a topic
  const lastPost = new Date(time);
 // Вычисляем разницу во времени
 const minutes = Math.floor((currentTime - lastPost) / 60000);
 const hours = Math.floor((currentTime - lastPost) / 3600000);
 const days = Math.floor((currentTime - lastPost) / 86400000);
  // Возвращаем результат на основе условий
  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
};

const viewCount = (views) => {
  const thousands = Math.floor(views / 1000);

  if (views >= 1000) {
    return `${thousands}k`;
  }

  return views;
};

//function to convert view counts to a more readable format
const formatViews = (views) => {
  if (views >= 1000) {
    return `${Math.floor((views / 1000))}k`;
  }  else {
    return views;
  }
};

//Each forum post will include a list of user avatar images which represent all of the users participating in the conversation for that topic
const avatars = (posters, users) => {
  return posters.map((poster) => {
    const user = users.find(user => 
      user.id === poster.user_id);
      //check if the user exists
      if (user) {
        const avatar = user.avatar_template.replace(/{size}/, 30)
        const userAvatarUrl = avatar.startsWith("/user_avatar/")
      ? avatarUrl.concat(avatar)
      : avatar;
      return `<img src="${userAvatarUrl}" alt="${user.name}"/>`
      }
  }).join("");
};

// request the data from an API
const fetchData = async () => {
    try {
        const res = await fetch(forumLatest);
        const data = await res.json();
        showLatestPosts(data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
};

fetchData();

//display the data on the page
const showLatestPosts = (data) => {
    const { topic_list, users} = data;
    const {topics} = topic_list;
    
    // Use map() to populate postsContainer
    postsContainer.innerHTML = topics.map((item) => {
        const {
          id,
          title,
          views,
          posts_count,
          slug,
          posters,
          category_id,
          bumped_at,
        } = item;
        return `
        <tr>
          <td>
            <a class="post-title" target="_blank" href="${forumTopicUrl}${slug}/${id}">${title}</a>
            ${forumCategory(category_id)}
          </td>
          <td>
          <div class="avatar-container">
            ${avatars(posters, users)}
          </div>
          </td>
          <td>${posts_count - 1}</td>
          <td>${viewCount(views)}</td>
          <td>${timeAgo(bumped_at)}</td>
        </tr>
      `;
    }).join("")
};