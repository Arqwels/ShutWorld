console.log ('Даня самый лучший дотер в мире!');





// const prefix = "duration"; // чтобы выпендриться

// const selects = document.querySelectorAll(prefix);

// selects.forEach(select => {
//     const header = select.querySelector("[" + prefix + "-header]");
//     const value = header.querySelector("[" + prefix + "-value]");
//     const properties = header.querySelectorAll("[" + prefix + "-property]");  // это потом

//     const box = select.querySelector("[" + prefix + "-box]");
//     const items = select.querySelectorAll("[" + prefix + "-item]");

//     const name = select.getAttribute(prefix + '-name');
//     const defaultValue = select.getAttribute(prefix + '-default'); // default null

//     let input = null;

//     select.addEventListener('click', ()=> {
//         console.log(11)
//         select.classList.toggle('active');

//         selects.forEach(item => {
//             if(item == select) return;
//             item.classList.remove('active');
//         })
//     });

//     if(defaultValue == null) {
//         value.textContent = "Выберите значение"
//     }

//     items.forEach(item => {
//         console.log(3)
//         const itemInfo = {
//             id: item.getAttribute(prefix + '-item'),
//             value: item.querySelector("[" + prefix + '-value]'),
//             properties: item.querySelectorAll("[" + prefix + "-property]") // это тоже потом
//         };

//         if(defaultValue != null && itemInfo.id == defaultValue) {
//             setItem(itemInfo);
//             console.log(2)
//         }

//         item.addEventListener('click', () => {
//             setItem(itemInfo);
//             console.log(1)
//         });
//     });

//     function setItem(info) {
//         if(input == null) {
//             const element = document.createElement('input');
//             element.setAttribute('name', name)
//             element.setAttribute('id', name);
//             element.setAttribute('hidden', '');

//             select.after(element);

//             input = element;

//         }

//         value.textContent = info.value.textContent;
//         input.setAttribute('value', info.id);

//         info.properties.forEach(property => {
//             const name = property.getAttribute(prefix + "-property");

//             properties.forEach(selectPropertyItem => {
//                 const selectName = selectPropertyItem.getAttribute(prefix + "-property");

//                 if(name == selectName) {
//                     selectPropertyItem.textContent = property.textContent;
//                 }
//             });
//         });
//     }
// });

// Скролл до товаров


// Модальное окно для покупки товаров

// const buttonElems = document.querySelectorAll('.modal__button');
// const body = document.querySelector('body');
// const lockPadding = document.querySelectorAll('.lock-padding');

// let unlock = true;

// const timeout = 300;

// if (buttonElems.length > 0) {
//     for (let i = 0; i < buttonElems.length; i++) {
//         const modalElem = buttonElems[i];
//         modalElem.addEventListener('click', (e)=> {
//             const modalName = modalElem.getAttribute('href').replace('#', '');
//             const curentModal = document.getElementById(modalName);
//             modalOpen(curentModal);
//             e.preventDefault();
//         });
//     };
// }

// const modalCloseI = document.querySelectorAll('.modal-close');
// if (modalCloseI.length > 0) {
//     for (let i = 0; i < modalCloseI.length; i++) {
//         const mc = modalCloseI[i];
//         mc.addEventListener('click', (e)=> {
//             modalClose(mc.closest('.modal'));
//         });
//     };
// }

// function modalOpen (curentModal) {
//     if (curentModal && unlock) {
//         const modalActive = document.querySelector('.modal.open');
//         if (modalActive) {
//             modalClose(modalActive, false);
//         } else {
//             bodyLock();
//         }
//         curentModal.classList.add('open');
//         curentModal.addEventListener('click', (e)=> {
//             if (!e.target.closest('.modal__content')) {
//                 modalClose(e.target.closest('.modal'));
//             }
//         });
//     }
// }

// function modalClose(modalActive, doUnlock = true) {
//     if (unlock) {
//         modalActive.classList.remove('open');
//         if (doUnlock) {
//             bodyUnLock();
//         }
//     }
// }

// function bodyLock() {
//     // const lockPaddingValue = window.innerWidth - document.querySelector('.container').offsetWidth + 'px';
//     // if (lockPadding.length > 0) {
//     //     for (let i = 0; i < lockPadding.length; i++) {
//     //         const el = lockPadding[i];
//     //         el.style.paddingRight = lockPaddingValue;
//     //     }
//     // }
//     // body.style.paddingRight = lockPaddingValue;

//     body.classList.add('lock');
//     unlock = false;
//     setTimeout(function () {
//         unlock = true;
//     }, timeout);
// }

// function bodyUnLock() {
//     setTimeout(function () {
//         // if (lockPadding.length > 0) {
//         //     for (let i = 0; i < lockPadding.length; i++) {
//         //         const el = lockPadding[i];
//         //         el.style.paddingRight = '0';
//         //     }
//         // }
//         // body.style.paddingRight = '0';
//         body.classList.remove('lock');
//     }, timeout);

//     unlock = false;
//     setTimeout(function () {
//         unlock = true;
//     }, timeout);
// }


// // Нужен фик При нажатии Esc выдаёт ошибку
// // document.addEventListener('keydown', function (e) {
// //     if (e.which === 27 || 'Escape') {
// //         const modalActive = document.querySelector('.modal.open');
// //         modalClose(modalActive);
// //     }
// // });

// // Полифилы | Polyfills
// (function () {
//     // Проверяем поддержку
//     if (!Element.prototype.closest) {
//         // Реализуем
//         Element.prototype.closest = function (css) {
//             var node = this;
//             while (node) {
//                 if (node.matches(css)) return node;
//                 else node = node.parentElement;
//             }
//             return null;
//         };
//     }
// })();
// (function () {
//     // Проверяем поддержку
//     if (!Element.prototype.matches) {
//         // Определяем свойство
//         Element.prototype.matches = Element.prototype.webkitMatchesSelector ||
//             Element.prototype.webkitMatchesSelector ||
//             Element.prototype.mozMatchesSelector ||
//             Element.prototype.msMatchesSelector;
//     }
// }());