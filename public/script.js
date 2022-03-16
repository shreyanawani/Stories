// const { param } = require("express/lib/request");

// const { param } = require("express/lib/request");

const ipbtn = document.querySelectorAll(".items");
console.log(ipbtn);
console.log("========================================");

const iplikes = document.querySelectorAll(".likes");
console.log(iplikes);
for (let i = 0; i < iplikes.length; i++) {
  console.log(iplikes[i]);

  iplikes[i].addEventListener("submit", function (e) {
    e.preventDefault();
    const params = new URL(iplikes[i].action).searchParams;
    console.log(params);
    const idd = params.get("id");
    const cidd = params.get("cloudinary_id");

    // console.log(document.getElementById(cidd));
    if (document.getElementById(cidd).className == "moo")
      document.getElementById(cidd).className = "foo";
    else document.getElementById(cidd).className = "moo";
    // const data = {
    //   id: params.get("id"),
    //   cid: params.get("cloudinary_id"),
    // };
    fetch(`/like/${idd}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });
  });
}

for (let i = 0; i < ipbtn.length; i++) {
  ipbtn[i].addEventListener("submit", function (e) {
    e.preventDefault();
    console.log(
      "***********************************************************************************************************"
    );
    const params = new URL(ipbtn[i].action).searchParams;
    const idd = params.get("id");
    const ip = document.getElementById(idd);
    ip.remove();
    console.log(params.get("cloudinary_id"));
    const data = {
      id: params.get("id"),
      cid: params.get("cloudinary_id"),
    };
    fetch("/apisend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // console.log(ipbtn[i].id);
  });
}
