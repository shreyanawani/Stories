// const { param } = require("express/lib/request");

// const { param } = require("express/lib/request");

const ipbtn = document.querySelectorAll(".items");

const iplikes = document.querySelectorAll(".likes");

for (let i = 0; i < iplikes.length; i++) {
  iplikes[i].addEventListener("submit", function (e) {
    e.preventDefault();
    const params = new URL(iplikes[i].action).searchParams;

    const idd = params.get("id");
    const cidd = params.get("cloudinary_id");

    if (document.getElementById(cidd).className == "far fa-heart emo_btn")
      document.getElementById(cidd).className = "fas fa-heart emo_btn";
    else document.getElementById(cidd).className = "far fa-heart emo_btn";

    fetch(`/posts/like/${idd}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
}

for (let i = 0; i < ipbtn.length; i++) {
  ipbtn[i].addEventListener("submit", function (e) {
    e.preventDefault();

    const params = new URL(ipbtn[i].action).searchParams;
    const idd = params.get("id");
    const ip = document.getElementById(idd);
    ip.remove();

    const data = {
      id: params.get("id"),
      cid: params.get("cloudinary_id"),
    };
    fetch("/posts/apisend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  });
}
