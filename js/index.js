const afterContentLoad = () => {
  //#region - start of - mobile navigation
  const collapseTogglers = document.querySelectorAll("[data-collapse-toggle]");
  collapseTogglers.forEach(button => {
    button.addEventListener("click", () => {
      document
        .querySelector(`#${button.dataset.collapseToggle}`)
        .classList.toggle("hidden");
    });
  });
  //#endregion - end of - mobile navigation
  loadCategories();
};
document.addEventListener("DOMContentLoaded", afterContentLoad);
const spinnerLoader = `<picture class="flex justify-center grow spinner-loader">
<img
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' style='margin: auto; background: none; display: block; shape-rendering: auto;' width='78px' height='78px' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'%3E%3Ccircle cx='50' cy='50' fill='none' stroke='%23ebbc50' stroke-width='10' r='35' stroke-dasharray='164.93361431346415 56.97787143782138'%3E%3CanimateTransform attributeName='transform' type='rotate' repeatCount='indefinite' dur='1s' values='0 50 50;360 50 50' keyTimes='0;1'%3E%3C/animateTransform%3E%3C/circle%3E%3C/svg%3E"
  alt="loading image"
  width="200"
  height="200"
/>
</picture>`;
const articleMarkup = (
  { img, name, published_date },
  details,
  thumbnail_url,
  title,
  total_view,
  postDetailsId,
  isDetailed = false
) => `
<article
          class="single-article flex gap-8 flex-col ${
            isDetailed === true ? "items-center py-12" : "lg:flex-row"
          } p-4 bg-white rounded-lg"
        >
          <figure class="flex ${
            isDetailed === true ? "justify-center" : "lg:w-1/4 lg:justify-start"
          } justify-center">
            <picture class="flex">
              <source srcset="${thumbnail_url}" />
              <img
                src="${thumbnail_url}"
                alt="article image"
                class="${
                  isDetailed === true ? "max-w-full" : "max-w-xs"
                } h-auto rounded object-cover"
                loading="lazy"
                ${
                  isDetailed === true
                    ? `width="600" height="300"`
                    : `width="300" height="400"`
                }
                decoding="async"
                fetchpriority="low"
              />
            </picture>
          </figure>
          <div
            class="article-details flex lg:w-3/4 flex-col gap-4 justify-center"
          >
            <h2 class="${
              isDetailed && "text-center"
            } article-title font-bold text-3xl pb-6">${title}</h2>
            <p class="article-description text-gray-500 pb-6">${details}</p>
            <div class="article-metadata flex flex-wrap gap-8 justify-between">
              <!--#region - start of - author-info -->
              <div class="lg:w-1/4 author-info flex items-center gap-4">
                <picture class="flex self-center article-author-image">
                  <source srcset="${img}" />
                  <img
                    src="${img}"
                    alt="article author image"
                    class="w-16 h-16 rounded-full object-cover aspect-square"
                    loading="lazy"
                    width="64"
                    height="64"
                    decoding="async"
                    fetchpriority="low"
                  />
                </picture>
                <div class="flex flex-col gap-1">
                  <h3 class="font-bold text-lg article-author-name capitalize">${
                    name !== null ? name : `No data found!`
                  }</h3>
                  <time class="text-sm text-gray-500" ${
                    published_date !== null
                      ? `datetime="${published_date}"`
                      : ""
                  }>${
  published_date !== null ? published_date : `No data found!`
}</time>
                </div>
              </div>
              <!--#endregion - end of - author-info -->
              <!--#region - start of - views-info -->
              <div class="lg:w-1/5 views-info flex items-center gap-4">
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="views info icon"
                >
                  <path
                    class="fill-gray-600"
                    d="M23.8717 11.745C22.9896 9.46324 21.4582 7.48996 19.4668 6.06906C17.4754 4.64817 15.1113 3.84193 12.6667 3.75C10.2221 3.84193 7.85798 4.64817 5.86659 6.06906C3.8752 7.48996 2.34381 9.46324 1.46169 11.745C1.40211 11.9098 1.40211 12.0902 1.46169 12.255C2.34381 14.5368 3.8752 16.51 5.86659 17.9309C7.85798 19.3518 10.2221 20.1581 12.6667 20.25C15.1113 20.1581 17.4754 19.3518 19.4668 17.9309C21.4582 16.51 22.9896 14.5368 23.8717 12.255C23.9313 12.0902 23.9313 11.9098 23.8717 11.745ZM12.6667 18.75C8.69169 18.75 4.49169 15.8025 2.96919 12C4.49169 8.1975 8.69169 5.25 12.6667 5.25C16.6417 5.25 20.8417 8.1975 22.3642 12C20.8417 15.8025 16.6417 18.75 12.6667 18.75Z"
                  />
                  <path
                    class="fill-gray-600"
                    d="M12.6667 7.5C11.7767 7.5 10.9066 7.76392 10.1666 8.25839C9.4266 8.75285 8.84982 9.45566 8.50923 10.2779C8.16864 11.1002 8.07952 12.005 8.25315 12.8779C8.42679 13.7508 8.85537 14.5526 9.48471 15.182C10.114 15.8113 10.9159 16.2399 11.7888 16.4135C12.6617 16.5872 13.5665 16.4981 14.3888 16.1575C15.211 15.8169 15.9138 15.2401 16.4083 14.5001C16.9028 13.76 17.1667 12.89 17.1667 12C17.1667 10.8065 16.6926 9.66193 15.8487 8.81802C15.0048 7.97411 13.8602 7.5 12.6667 7.5ZM12.6667 15C12.0733 15 11.4933 14.8241 11 14.4944C10.5066 14.1648 10.1221 13.6962 9.89505 13.148C9.66799 12.5999 9.60858 11.9967 9.72433 11.4147C9.84009 10.8328 10.1258 10.2982 10.5454 9.87868C10.9649 9.45912 11.4995 9.1734 12.0814 9.05764C12.6634 8.94189 13.2666 9.0013 13.8147 9.22836C14.3629 9.45542 14.8315 9.83994 15.1611 10.3333C15.4907 10.8266 15.6667 11.4067 15.6667 12C15.6667 12.7956 15.3506 13.5587 14.788 14.1213C14.2254 14.6839 13.4623 15 12.6667 15Z"
                  />
                </svg>
                <span
                  class="view-count uppercase text-gray-600 font-bold text-lg"
                  >${total_view !== null ? total_view : `No data found!`}</span
                >
              </div>
              <!--#endregion - end of - views-info -->
              <!--#region - start of - reviews-info -->
              <div class="lg:w-1/4 reviews-info flex items-center gap-2">
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="review star icon"
                >
                  <path
                    id="review-star-half"
                    class="fill-gray-600"
                    d="M3.35837 19.775C3.32411 19.9217 3.32349 20.0742 3.35657 20.2212C3.38964 20.3681 3.45555 20.5057 3.54935 20.6235C3.64315 20.7414 3.76241 20.8365 3.89819 20.9017C4.03397 20.9669 4.18275 21.0005 4.33337 21C4.5309 21.0001 4.72402 20.9416 4.88837 20.832L10.3334 17.202L15.7784 20.832C15.9487 20.9451 16.1496 21.0033 16.354 20.9988C16.5584 20.9944 16.7565 20.9274 16.9218 20.8069C17.087 20.6865 17.2113 20.5183 17.2781 20.3251C17.3449 20.1318 17.3509 19.9228 17.2954 19.726L15.4664 13.326L20.0024 9.24401C20.1476 9.1132 20.2514 8.94268 20.3008 8.75353C20.3502 8.56437 20.343 8.3649 20.2803 8.17976C20.2175 7.99462 20.1018 7.83194 19.9476 7.71184C19.7933 7.59174 19.6073 7.51949 19.4124 7.50401L13.7114 7.05001L11.2444 1.58901C11.1658 1.41313 11.038 1.26374 10.8764 1.15887C10.7148 1.05401 10.5263 0.998153 10.3337 0.998047C10.1411 0.997941 9.95251 1.05359 9.7908 1.15828C9.62909 1.26296 9.50113 1.41221 9.42237 1.58801L6.95537 7.05001L1.25437 7.50301C1.06283 7.51819 0.879708 7.58822 0.726925 7.70475C0.574142 7.82127 0.458163 7.97934 0.392863 8.16004C0.327563 8.34075 0.315708 8.53645 0.358715 8.72372C0.401722 8.91099 0.497771 9.0819 0.63537 9.21601L4.84937 13.323L3.35837 19.775ZM10.3334 4.42901L12.3754 8.95001L12.9634 8.99701H12.9644L16.9364 9.31201L13.6654 12.256L13.6644 12.258L13.2014 12.674L13.3724 13.271V13.274L14.6254 17.659L10.3334 14.798V4.42901Z"
                  />
                </svg>

                <svg
                  class="w-6 h-6"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="review star icon"
                >
                  <path
                    id="review-star-empty"
                    class="fill-gray-600"
                    d="M19.617 7.27578L13.6662 6.41093L11.006 1.01797C10.9334 0.870309 10.8138 0.750778 10.6662 0.678121C10.2959 0.495309 9.84587 0.647653 9.66072 1.01797L7.00056 6.41093L1.04978 7.27578C0.885716 7.29922 0.735716 7.37656 0.620872 7.49375C0.482032 7.63645 0.405525 7.82843 0.408162 8.02752C0.410799 8.2266 0.492364 8.41649 0.634935 8.55547L4.9404 12.7531L3.92322 18.6805C3.89936 18.8183 3.91462 18.9602 3.96726 19.0898C4.0199 19.2195 4.10781 19.3318 4.22103 19.414C4.33425 19.4962 4.46825 19.5451 4.60782 19.555C4.7474 19.565 4.88697 19.5356 5.01072 19.4703L10.3334 16.6719L15.656 19.4703C15.8013 19.5477 15.9701 19.5734 16.1318 19.5453C16.5396 19.475 16.8138 19.0883 16.7435 18.6805L15.7263 12.7531L20.0318 8.55547C20.149 8.44062 20.2263 8.29062 20.2498 8.12656C20.3131 7.7164 20.0271 7.33672 19.617 7.27578ZM13.9146 12.1625L14.7607 17.0914L10.3334 14.7664L5.90603 17.0937L6.75212 12.1648L3.17087 8.67265L8.12087 7.95312L10.3334 3.46953L12.5459 7.95312L17.4959 8.67265L13.9146 12.1625Z"
                  />
                </svg>
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="review star icon"
                >
                  <use href="#review-star-empty" />
                </svg>
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="review star icon"
                >
                  <use href="#review-star-empty" />
                </svg>
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="review star icon"
                >
                  <use href="#review-star-empty" />
                </svg>
              </div>
              <!--#endregion - end of - reviews-info -->
              <!--#region - start of - read-more -->
              ${
                postDetailsId === false
                  ? ""
                  : `
              <button
                class="lg:w-14 text-purple-600 hover:text-purple-900 transition-colors"
                type="button"
                aria-label="read more about this article"
                data-modal-ref="article-read-more"
                data-post-details-id="${postDetailsId}"
              >
                <svg
                  class="w-6 h-6 fill-current"
                  viewBox="0 0 21 18"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="read more icon"
                >
                  <path
                    class="fill-current"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.10352e-05 8.99999C6.10352e-05 8.66847 0.131757 8.35053 0.366178 8.11611C0.600598 7.88169 0.91854 7.74999 1.25006 7.74999H15.7326L10.3651 2.38499C10.1303 2.15028 9.99848 1.83193 9.99848 1.49999C9.99848 1.16805 10.1303 0.849709 10.3651 0.614992C10.5998 0.380276 10.9181 0.248413 11.2501 0.248413C11.582 0.248413 11.9003 0.380276 12.1351 0.614992L19.6351 8.11499C19.7515 8.23111 19.8438 8.36905 19.9068 8.52091C19.9699 8.67277 20.0023 8.83557 20.0023 8.99999C20.0023 9.16441 19.9699 9.32721 19.9068 9.47908C19.8438 9.63094 19.7515 9.76888 19.6351 9.88499L12.1351 17.385C11.9003 17.6197 11.582 17.7516 11.2501 17.7516C10.9181 17.7516 10.5998 17.6197 10.3651 17.385C10.1303 17.1503 9.99848 16.8319 9.99848 16.5C9.99848 16.1681 10.1303 15.8497 10.3651 15.615L15.7326 10.25H1.25006C0.91854 10.25 0.600598 10.1183 0.366178 9.88388C0.131757 9.64946 6.10352e-05 9.33151 6.10352e-05 8.99999Z"
                  />
                </svg>
              </button>
              `
              }
              
              <!--#endregion - end of - read-more -->
            </div>
          </div>
        </article>
`;

const loadCategories = async () => {
  try {
    const categoryButtonsContainer = document.querySelector(
      ".category-buttons-container"
    );
    const articlesContainer = document.querySelector(".articles-container");
    const categoriesUrl = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(categoriesUrl);
    const data = await response.json();

    const categoryNamesSortedArr = data.data.news_category.sort((a, b) => {
      if (a.category_name < b.category_name) {
        return -1;
      }
      if (a.category_name > b.category_name) {
        return 1;
      }
      return 0;
    });
    emptyElement(categoryButtonsContainer);
    categoryNamesSortedArr.forEach(({ category_id, category_name }) => {
      categoryButtonsContainer.insertAdjacentHTML(
        "beforeend",
        `<button type="button" data-category-id="${category_id}" class="news-category-button inline-flex rounded justify-center items-center capitalize bg-purple-100 text-purple-900 transition-colors hover:bg-slate-800 hover:text-white px-3 py-2">${category_name}</button>`
      );
    });

    categoryButtonsContainer.addEventListener("click", ev => {
      if (!ev.target.dataset.categoryId) return;

      //#region - start of - handle category buttons click

      //#region - start of - update active class
      document.querySelectorAll(".news-category-button").forEach(btn => {
        btn.classList.remove("bg-purple-900", "text-white");
        btn.classList.add("bg-purple-100", "text-purple-900");
      });

      const newsCategoryButton = ev.target;
      newsCategoryButton.classList.remove("bg-purple-100", "text-purple-900");
      newsCategoryButton.classList.add("bg-purple-900", "text-white");
      //#endregion - end of - update active class

      emptyElement(articlesContainer);
      articlesContainer.insertAdjacentHTML("beforeend", spinnerLoader);
      loadCategoryItems(
        newsCategoryButton.dataset.categoryId,
        newsCategoryButton.innerText.toLowerCase()
      );
      //#endregion - end of - handle category buttons click
    });
    document.querySelector(".news-category-button").click();
  } catch (error) {
    console.error(error);
  }
};

const loadCategoryItems = async (categoryId, itemName) => {
  try {
    const articlesContainer = document.querySelector(".articles-container");
    const categoryCount = document.querySelector(".category-count");
    const categoryName = document.querySelector(".category-name");
    const selectedCategoryUrl = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const response = await fetch(selectedCategoryUrl);
    const data = await response.json();

    categoryCount.innerText = data.data.length;
    categoryName.innerText = itemName;

    emptyElement(articlesContainer);
    if (data.data.length === 0) {
      articlesContainer.insertAdjacentHTML(
        "beforeend",
        `<p class="text-center text-4xl text-red-600">No data found!</p>`
      );
      return;
    }

    const sortedByViewsDesArr = data.data.sort((a, b) => {
      if (a.total_view < b.total_view) {
        return 1;
      }
      if (a.total_view > b.total_view) {
        return -1;
      }
      return 0;
    });
    // console.log(sortedByViewsDesArr);

    sortedByViewsDesArr.forEach(
      ({ author, details, thumbnail_url, title, total_view, _id }) => {
        articlesContainer.insertAdjacentHTML(
          "beforeend",
          articleMarkup(
            author,
            details.slice(0, 300) + "...",
            thumbnail_url,
            title,
            total_view,
            _id
          )
        );
      }
    );

    initModals();

    articlesContainer
      .querySelectorAll("[data-post-details-id]")
      .forEach(btn => {
        btn.addEventListener("click", () => {
          //#region - start of - handle post details modal
          loadArticleDetails(btn.dataset.postDetailsId);
          //#endregion - end of - handle post details modal
        });
      });
  } catch (error) {
    console.error(error);
  }
};
const loadArticleDetails = async postId => {
  try {
    const articleReadMoreContainer = document.querySelector(
      ".article-read-more-container"
    );
    const selectedCategoryUrl = `https://openapi.programming-hero.com/api/news/${postId}`;
    const response = await fetch(selectedCategoryUrl);
    const data = await response.json();
    emptyElement(articleReadMoreContainer);

    const { author, details, image_url, title, total_view, _id } = data.data[0];
    articleReadMoreContainer.insertAdjacentHTML(
      "beforeend",
      articleMarkup(author, details, image_url, title, total_view, false, true)
    );
  } catch (error) {
    console.error(error);
  }
};
