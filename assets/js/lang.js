document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-lang]").forEach((toggle) =>
        toggle.addEventListener("click", () => {
            if (toggle.getAttribute("data-lang") === "en")
                document.getElementById("resume-dut").style.display = "none";
            else document.getElementById("resume-dut").style.display = "block";
            document
                .querySelectorAll("[data-lang].active")
                .forEach((el) => el.classList.remove("active"));
            toggle.classList.add("active");
            fetch(`./assets/lang/${toggle.getAttribute("data-lang")}.json`)
                .then((response) => response.json())
                .then((json) =>
                    document
                        .querySelectorAll("[data-lang-key]")
                        .forEach((el) => {
                            el.innerHTML =
                                json[el.getAttribute("data-lang-key")];
                        })
                );
        })
    );
    document.querySelector("[data-lang='fr']").click();
});
