/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Ashwin B N>
 *      Student ID: <112763222>
 *      Date:       <17-11-2024>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

document.addEventListener("DOMContentLoaded", function () {
  // Your array of artists and songs (artists and songs from your provided data)

  function displayArtists() {
    const menu = document.querySelector("#menu");
    artists.forEach((artist) => {
      const button = document.createElement("button");
      button.textContent = artist.name;
      button.addEventListener("click", () => displayArtistDetails(artist));
      menu.appendChild(button);
    });
  }

  window.addEventListener("load", () => {
    displayArtistDetails(window.artists[0]);
  });

  function displayArtistDetails(artist) {
    const selectedArtist = document.querySelector("#selected-artist");
    selectedArtist.innerHTML = `${artist.name} (<a href="${artist.urls[0].url}" target="_blank">${artist.urls[0].name}</a>, <a href="${artist.urls[1].url}" target="_blank">${artist.urls[1].name}</a>)`;

    displaySongs(artist);
  }

  function displaySongs(artist) {
    const container = document.querySelector(".container");
    container.innerHTML = "";

    songs
      .filter((song) => song.artistId === artist.artistId)
      .forEach((song) => {
        if (!song.explicit) {
          const card = createSongCard(song);
          container.appendChild(card);
        }
      });
  }

  function createSongCard(song) {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = song.urlImage;
    image.alt = song.title;
    image.addEventListener("click", () => window.open(song.url, "_blank"));
    card.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = song.title;
    card.appendChild(title);

    const yearDuration = document.createElement("div");
    yearDuration.classList.add("year-duration");

    const year = document.createElement("div");
    year.classList.add("year");
    year.textContent = song.year;
    yearDuration.appendChild(year);

    const duration = document.createElement("div");
    duration.classList.add("duration");
    duration.textContent = `${Math.floor(song.duration / 60)}:${(song.duration % 60)
      .toString()
      .padStart(2, "0")}`;
    yearDuration.appendChild(duration);

    card.appendChild(yearDuration);

    return card;
  }

  const homeButton = document.getElementById("homeButton");

  homeButton.addEventListener("click", function () {
    window.location.href = "./index.html";
  });

  displayArtists();
});
// For debugging, display all of our data in the console. You can remove this later.
//console.log({ artists, songs }, "App Data");
