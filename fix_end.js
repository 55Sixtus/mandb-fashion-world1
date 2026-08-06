const fs = require("fs");
let content = fs.readFileSync("index.html", "utf-8");

content = content.replace(`        scrollToTopBtn.addEventListener("click", () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
      });
    </script>`, `        scrollToTopBtn.addEventListener("click", () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      });
    </script>`);

fs.writeFileSync("index.html", content);
