/*
  Renders index.html from the data in content.js (window.SITE_CONTENT).
  You should not need to edit this file to update the site's text —
  edit content.js instead. This file only needs changes if you want to
  change how things are laid out or add a brand-new section type.
*/

(function () {
  "use strict";

  const data = window.SITE_CONTENT;
  if (!data) {
    console.error("SITE_CONTENT not found — check that content.js loaded before js/main.js.");
    return;
  }

  const $ = (id) => document.getElementById(id);

  function escapeHTML(str) {
    if (str === undefined || str === null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function mailto(email, subject) {
    return "mailto:" + email + (subject ? "?subject=" + encodeURIComponent(subject) : "");
  }

  // ---- Document head / masthead -----------------------------------------
  document.title = data.site.name;
  document.querySelectorAll(".wordmark, #footer-wordmark").forEach((el) => {
    el.textContent = data.site.name.toUpperCase();
  });

  // ---- Hero ---------------------------------------------------------------
  $("hero-eyebrow").textContent = data.hero.eyebrow || "";
  $("hero-headline").textContent = data.hero.headline || "";
  $("hero-subhead").textContent = data.hero.subhead || "";
  $("hero-linkedin").href = data.site.linkedin || "#";

  const avatarEl = $("hero-avatar");
  if (data.site.photo) {
    avatarEl.innerHTML = `<img src="images/${escapeHTML(data.site.photo)}" alt="${escapeHTML(data.site.name)}">`;
  } else {
    avatarEl.textContent = data.site.initials || "";
  }

  // ---- About ----------------------------------------------------------
  $("about-heading").textContent = data.about.heading || "About";
  $("about-body").innerHTML = (data.about.paragraphs || [])
    .map((p) => `<p>${escapeHTML(p)}</p>`)
    .join("");

  // ---- Experience (points to LinkedIn) -------------------------------------
  $("experience-heading").textContent = data.experience.heading || "Experience";
  $("experience-note").textContent = data.experience.note || "";
  $("experience-linkedin").textContent = data.experience.buttonLabel || "View LinkedIn Profile";
  $("experience-linkedin").href = data.site.linkedin || "#";

  // ---- Education ------------------------------------------------------
  const eduList = $("education-list");
  eduList.innerHTML = (data.education || [])
    .map(
      (e) => `
      <div class="info-card">
        <div class="info-card-title">${escapeHTML(e.school)}</div>
        <div class="info-card-sub">${escapeHTML(e.degree)}</div>
        ${e.activities ? `<div class="info-card-meta">${escapeHTML(e.activities)}</div>` : ""}
      </div>
    `
    )
    .join("");

  // ---- Certifications -----------------------------------------------
  const certList = $("certifications-list");
  certList.innerHTML = (data.certifications || [])
    .map(
      (c) => `
      <div class="info-card">
        <div class="info-card-title">${escapeHTML(c.name)}</div>
        <div class="info-card-sub">${escapeHTML(c.issuer)}</div>
        <div class="info-card-meta">${escapeHTML(c.issued)}${c.credentialId ? " · ID " + escapeHTML(c.credentialId) : ""}</div>
      </div>
    `
    )
    .join("");

  // ---- Projects (story card renderer) --------------------------------------
  function renderStoryCards(containerId, items, opts) {
    const container = $(containerId);
    if (!items || items.length === 0) {
      container.innerHTML = `<p class="empty-state">${escapeHTML(opts.emptyText)}</p>`;
      return;
    }
    container.innerHTML = items
      .map((item) => {
        const title = escapeHTML(item[opts.titleField]);
        const isEmbed = item.embed && item.embed.trim();
        const media = isEmbed
          ? `<iframe src="${escapeHTML(item.embed)}" title="${title}" loading="lazy" allow="fullscreen"></iframe>`
          : item.image
          ? `<img src="images/${opts.imageFolder}/${escapeHTML(item.image)}" alt="${title}">`
          : escapeHTML(item.emoji || "");
        const tags = (item.tags || []).map((t) => `<span class="tag">${escapeHTML(t)}</span>`).join("");
        const link =
          item.link && item.link.trim()
            ? `<a class="story-card-link" href="${escapeHTML(item.link)}" target="_blank" rel="noopener">${escapeHTML(item.linkLabel || "View")} →</a>`
            : "";
        const eyebrow = item.date ? `<div class="category-eyebrow">${escapeHTML(item.date)}</div>` : "";

        return `
          <div class="story-card">
            <div class="story-card-media${isEmbed ? " story-card-media-embed" : ""}">${media}</div>
            <div class="story-card-body">
              ${eyebrow}
              <h3 class="story-card-title">${title}</h3>
              <p class="story-card-desc">${escapeHTML(item[opts.descField])}</p>
              ${tags ? `<div class="tag-row">${tags}</div>` : ""}
              ${link}
            </div>
          </div>
        `;
      })
      .join("");
  }

  renderStoryCards("projects-list", data.projects, {
    titleField: "title",
    descField: "description",
    imageFolder: "projects",
    emptyText: "New projects coming soon."
  });

  // ---- Contact ----------------------------------------------------------
  $("contact-detail").textContent = `Based in ${data.site.location || "the world"}. Reach out about AI transformation work, collaboration, or just to say hi.`;
  $("contact-email").href = mailto(data.site.email, "Hello from your website");
  $("contact-linkedin").href = data.site.linkedin || "#";
  $("footer-email").href = mailto(data.site.email);
  $("footer-note").textContent = (data.footer && data.footer.note) || "";

  // ---- Mobile nav toggle --------------------------------------------------
  const masthead = $("masthead");
  const hamburger = $("hamburger");
  hamburger.addEventListener("click", () => {
    const isOpen = masthead.classList.toggle("nav-open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      masthead.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
})();
