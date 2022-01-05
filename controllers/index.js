module.exports = function (req, res, next) {
  listOfEvents = [
    {
      IMAGE_URL: "images/Wallpaper.jpg",
      EVENT_TITLE: "Card title",
      EVENT_DESC:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    },
    {
      IMAGE_URL: "images/Wallpaper.jpg",
      EVENT_TITLE: "Card title",
      EVENT_DESC:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    },
    {
      IMAGE_URL: "images/Wallpaper.jpg",
      EVENT_TITLE: "Card title",
      EVENT_DESC:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    },
    {
      IMAGE_URL: "images/Wallpaper.jpg",
      EVENT_TITLE: "Card title",
      EVENT_DESC:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    },
    {
      IMAGE_URL: "images/Wallpaper.jpg",
      EVENT_TITLE: "Card title",
      EVENT_DESC:
        "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    },
  ];
  res.render("index", { listOfEvents: listOfEvents });
};
