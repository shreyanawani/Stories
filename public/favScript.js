const ipbtn = document.querySelectorAll(".items");
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

const iplikes = document.querySelectorAll(".likes");
for (let i = 0; i < iplikes.length; i++) {
  iplikes[i].addEventListener("submit", function (e) {
    e.preventDefault();
    const params = new URL(iplikes[i].action).searchParams;

    const idd = params.get("id");
    const ip = document.getElementById(idd);
    ip.remove();

    fetch(`/posts/like/${idd}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
}
