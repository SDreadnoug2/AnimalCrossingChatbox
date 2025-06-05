class Message {
  constructor(user, message, color) {
    const template = document.getElementById("message-template");
    const clone = template.content.cloneNode(true);
    this.element = clone.querySelector(".message__container");
    this.element.querySelector(".message__user").textContent = user;
    this.element.querySelector(".message__content").innerHTML = message;
    this.top = this.element.querySelector("#top");
    this.bottom = this.element.querySelector("#bottom");
    this.textHeight = this.element.querySelector(".message__content").offsetHeight;
    this.element.querySelector(".message__user").style.backgroundColor = color[0];
    this.element.querySelector(".message__user").style.color = color[1];
    this.animate();
  }

  animate() {
  }
}
