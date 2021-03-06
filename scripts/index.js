const initialCards = [
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
];

const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

const inputName = document.querySelector(".form__input_type_name");
const inputJob = document.querySelector(".form__input_type_job");
const inputTitle = document.querySelector(".form__input_type_title");
const inputUrl = document.querySelector(".form__input_type_url");

const closeButtonEdit = document.querySelector(".modal__close-button_edit");
const closeButtonAdd = document.querySelector(".modal__close-button_add");
const closeButtonImg = document.querySelector(".modal__close-button_pic");

const addModalWindow = document.querySelector(".modal_type_add");
const editModalWindow = document.querySelector(".modal_type_edit");
const imgModalWindow = document.querySelector(".modal_type_pic");

const formEdit = document.querySelector(".form_edit");
const formAdd = document.querySelector(".form_add");

const addButton = document.querySelector(".profile__add-btn");
const editButton = document.querySelector(".profile__edit-btn");

const list = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card__template").content;

const imgModal = document.querySelector(".modal__img");

function toggleModalWindow(modal) {
  modal.classList.toggle("modal_open");
}

function AddFormSubmitHandler(evt) {
  evt.preventDefault();
  list.prepend(newCard(inputTitle.value, inputUrl.value));
  toggleModalWindow(addModalWindow);
  formAdd.reset();
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  toggleModalWindow(editModalWindow);
}

function keydownClose(evt) {
  if (evt.key === "Escape") {
    if (addModalWindow.classList.contains("modal_open")) {
      toggleModalWindow(addModalWindow);
      document.removeEventListener("keydown", keydownClose);
    } else if (editModalWindow.classList.contains("modal_open")) {
      toggleModalWindow(editModalWindow);
      document.removeEventListener("keydown", keydownClose);
    } else if (imgModalWindow.classList.contains("modal_open")) {
      toggleModalWindow(imgModalWindow);
      document.removeEventListener("keydown", keydownClose);
    }
  }
}

function closeClickModal(evt) {
  if (evt.target === addModalWindow) {
    toggleModalWindow(addModalWindow);
    window.removeEventListener("click", closeClickModal);
  } else if (evt.target === editModalWindow) {
    toggleModalWindow(editModalWindow);
    window.removeEventListener("click", closeClickModal);
  } else if (evt.target === imgModalWindow) {
    toggleModalWindow(imgModalWindow);
    window.removeEventListener("click", closeClickModal);
  }
}
class Card {
  constructor(data, cardSelector) {
    this.cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card__template")
      .content.querySelector(".card")
      .cloneNode(true);
  }
}
function newCard(title, url) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardPic = cardElement.querySelector(".card__pic");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardHeart = cardElement.querySelector(".card__heart");
  const cardDelete = cardElement.querySelector(".card__delete-btn");

  cardPic.src = url;
  cardPic.setAttribute("alt", title);
  cardTitle.textContent = title;

  cardHeart.addEventListener("click", (evt) =>
    evt.target.classList.toggle("card__heart_active")
  );

  cardDelete.addEventListener("click", () => {
    const listItem = cardDelete.closest(".card");
    listItem.remove();
  });

  cardPic.addEventListener("click", () => {
    imgModal.src = url;
    imgModal.setAttribute("alt", title);
    toggleModalWindow(imgModalWindow);
    const modalCaption = document.querySelector(".modal__caption");
    modalCaption.textContent = title;
    window.addEventListener("click", closeClickModal);
    document.addEventListener("keydown", keydownClose);
  });

  return cardElement;
}

initialCards.forEach((data) => {
  list.prepend(newCard(data.name, data.link));
});

formEdit.addEventListener("submit", editFormSubmitHandler);
formAdd.addEventListener("submit", AddFormSubmitHandler);

addButton.addEventListener("click", () => {
  toggleModalWindow(addModalWindow);
  document.addEventListener("keydown", keydownClose);
  window.addEventListener("click", closeClickModal);
});

editButton.addEventListener("click", () => {
  if (!editModalWindow.classList.contains("modal_open")) {
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
  }
  toggleModalWindow(editModalWindow);
  document.addEventListener("keydown", keydownClose);
  window.addEventListener("click", closeClickModal);
});

closeButtonImg.addEventListener("click", () => {
  toggleModalWindow(imgModalWindow);
});

closeButtonEdit.addEventListener("click", () => {
  toggleModalWindow(editModalWindow);
  formEdit.reset();
});

closeButtonAdd.addEventListener("click", () => {
  toggleModalWindow(addModalWindow);
  formAdd.reset();
});
