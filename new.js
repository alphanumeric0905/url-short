let input = document.querySelector(".link");
let short = document.querySelector(".short");
let resultDiv = document.querySelector(".result");

short.addEventListener("click", () => {
  let longUrl = input.value;
  shortenLinkWithTinyURL(longUrl);
});

async function shortenLinkWithTinyURL(longUrl) {
  const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const shortUrl = await response.text();
    console.log("Shortened URL:", shortUrl);
    addResult(longUrl, shortUrl);
    return shortUrl;
  } catch (error) {
    console.error("Error shortening URL:", error);
  }
}

function addResult(longUrl, shortUrl) {
  input.value = shortUrl; 
  addToHistory(longUrl, shortUrl);
}

function addToHistory(longUrl, shortUrl) {
  let parent = document.getElementsByClassName("result")[0];

  let newDiv = document.createElement("div");
  newDiv.className = "url-box";
  newDiv.style.backgroundColor = "white";
  newDiv.style.padding = "10px";
  newDiv.style.marginTop = "10px";
  newDiv.style.marginLeft="150px";
  newDiv.style.width="1190px";
  
  newDiv.innerHTML = `
    <p> ${longUrl} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      <span class="short-url">${shortUrl}</span>
      <button class="copy-btn" style="backgroundColor: #00ffff">Copy</button>
      
    </p>
  `;
   

  parent.appendChild(newDiv);

  
  const copyBtn = newDiv.querySelector(".copy-btn");
  const shortUrlSpan = newDiv.querySelector(".short-url");
  const copiedMsg = newDiv.querySelector(".copied-msg");
  shortUrlSpan.style.marginRight="5%";
  shortUrlSpan.style.marginLeft="30%";
  copyBtn.style.marginLeft="10px";
  copyBtn.style.backgroundColor="#00ffff";
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(shortUrlSpan.textContent).then(() => {
      copyBtn.innerText="Copied!";
      copyBtn.style.backgroundColor="#800080";
      copyBtn.style.color="#ffffff";
      
      setTimeout(() => {
        copiedMsg.style.display = "none";
      }, 1500);
    });
  });
}
