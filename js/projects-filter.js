const initFilter = ({ projectsSwiper, filterEvents, listItems, onChange }) => {
  filterEvents.forEach((event) => {
    event.onclick = () => {
      filterEvents.forEach((item) => item.classList.remove("active"));
      const filterName = event.getAttribute("data-filter");
      const wrapper = projectsSwiper.querySelector(".swiper-wrapper");
      wrapper.innerHTML = "";

      listItems.forEach((slide) => {
        const element = slide.querySelector(".projects__item");
        console.log(slide, element);
        let isActive =
          filterName === "all"
            ? true
            : element.classList.contains(`_${filterName}`);

        console.log(isActive, "isActive");
        if (isActive) wrapper.appendChild(slide);
        // if (!isActive) element.parentElement.classList.add("disabled");
        // else element.parentElement.classList.remove("disabled");
      });
      event.classList.add("active");
      onChange();
    };
  });
};

///
///
///
///FILTER JS
const filterEvents = document.querySelectorAll('[data-event="filter"]');
const projectsSwiper = document.querySelector("#projectsSwiper");
const listItems = projectsSwiper.querySelectorAll(".swiper-slide");
const cloneList = [];
listItems.forEach((element) => cloneList.push(element.cloneNode(true)));

if (filterEvents && listItems) {
  initFilter({
    projectsSwiper,
    filterEvents,
    listItems: cloneList,
    onChange: () => {
      if (projectsSwiper.swiper) projectsSwiper.swiper.destroy(true);
      else console.log("can't destroy", projectsSwiper.swiper);

      //   projectsSwiper.swiper.removeAttr("style");
      setTimeout(() => {
        initSwiper(projectsSwiper);
        projectsSwiper.swiper.slideTo(0);
      }, 100);
    },
  });
}
