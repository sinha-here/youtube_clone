// !--- Normal Code --- 
let toggleButton = document.getElementById("toggleButton");
// console.log(toggleButton);

let hide_items = document.getElementsByClassName("hide_items");
// console.log(hide_items);

toggleButton.addEventListener("click", () =>{
    // console.log("clicking...");

    for(let val of hide_items){
        console.log(val);

        val.classList.toggle("hidden_content");

        /*
        1. add()     - It will add a new class name
        2. remove()  - It will remove the existing class name 
        3. replace() - It will replace the existing class name with new class name 
        4. toggle()  - It will check the class name present or not.
                       If present it will remove
                       If not it will add
        5. Contains()- It will return a boolean value based on class name present or not.
        */
    }
});

// ! ---- API Intergration -----

/*
 ! 1. Google Cloud:
      a.search google cloud
      b.click on first link
      c.click on console
      d.click on i agree
      e.click on agree and continue 
      f.click on select a project 
      g.create a project 
      h.select the same project 
      i.click on navigation menu
      j.then hover on api and services
      k.click on library 
      l.scroll down and click on youtube data api v3
      m.click on ENABLE
      n.click on create credentials 
      o.opt for public data
      p.after click on NEXT
      q.copy and paste api key.

    ! 2. Youtube Data API:
    a. search youtube data api  
*/

// ? Code:
let apiKey = "AIzaSyBKYglieoOzjdYDSJGW8dISMwXR8prOKWk";
let searchHttp = "https://www.googleapis.com/youtube/v3/search?";
let channelHttps = "https://www.googleapis.com/youtube/v3/channels";

let callYoutubeDataAPI = async query => {
    console.log(query);
    let searchParams = new URLSearchParams({
        key: apiKey,
        part: "snippet",
        q: query,
        maxResults : 15,
        type: "video",
        regionCode: "IN",
    });

    let res = await fetch(searchHttp + "?" + searchParams);
    console.log(res);
    let data = await res.json();
    console.log(data);

    data.items.map(item => {
        console.log(item); // videoLink , channelId, channelTitle , description , title , thumbnailLink

        getChannelIcon(item);
    });
};

// ? to get channel icon based on channel id 
let getChannelIcon = async video_data => {
    console.log(video_data);

    let channelParams = new URLSearchParams({
        key: apiKey,
        part: "snippet",
        id: video_data.snippet.channelId,
    });

    let res = await fetch(channelHttps + "?" + channelParams);
    let data = await res.json();
    console.log(data);
    video_data.channelIconImage = data.items[0].snippet.thumbnails.default.url;
    console.log(video_data);

    appendVideosInToContainer(video_data);
};

// ! To display the video 

let appendVideosInToContainer = video_data => {
    console.log(video_data);

    let{snippet , channelIconImage ,id: {videoId} } = video_data;
    console.log(snippet);
    console.log(channelIconImage);
    console.log(videoId);

    main_content.innerHTML += `
    <a href = "https://www.youtube.com/watch?v=${videoId}">
    <main class="video_container">
                <article class="imageBox">
                 <img src="${snippet.thumbnails.high.url}" alt="">
                </article>
                <article class="infoBox">
                    <div>
                    <img src="${channelIconImage}" alt="">
                    </div>
                    <div>
                        <p>${snippet.title}</p>
                        <p class="channelName">${snippet.channelTitle}</p>
                    </div>
                </article>
            </main>
       </a>
    `;
}

let search_button = document.getElementById("search_button");
console.log(search_button);

search_button.addEventListener("click",() => {
  let user_input = document.getElementById("user_input").value;
  console.log(user_input)
  callYoutubeDataAPI(user_input);
}); 