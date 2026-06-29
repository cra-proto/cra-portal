"use strict";

let accordions, 
    anchorEl, 
    anchorUri, 
    expandHideBtn, 
    expansionPanel, 
    tabs, 
    tabBtns, 
    tableElm, 
    tableHeaders, 
    accountBtn = document.querySelector(".quartz-primary-button"), 
    allForms = document.querySelectorAll("form"), 
    sideNav = document.querySelector("mat-sidenav"), 
    checkboxes = document.querySelectorAll("quartz-checkbox"), 
    dialogs = document.querySelectorAll("button[popovertarget]"), 
    linkBtns = document.querySelectorAll("button[value^='http']"), 
    pageTabs = document.querySelectorAll("quartz-tabs"), 
    printBtns = document.querySelectorAll("button[value='print']"), 
    radios = document.querySelectorAll("quartz-radio-button"), 
    stepContainer = document.querySelectorAll("div.mat-step"), 
    contentSection = document.getElementsByTagName("mat-drawer-content"), 
    quartzSideNav = document.getElementsByTagName("quartz-sidenav"), 
    navLink = quartzSideNav[0].getElementsByTagName("a"), 
    sdMenuBtn = document.getElementsByTagName("quartz-icon-button"), 
    sideMenuBtn = sdMenuBtn[0].getElementsByTagName("button"), 
    tables = document.querySelectorAll("quartz-table"), 
    resetAccordion = function (el) {
        let matPanel = el.closest("mat-expansion-panel"), 
            expandMenuState = { Open: " chevron_right ", Close: " expand_more " }, 
            matPanelHead = el.closest("mat-expansion-panel-header"), 
            matIcon = matPanel.querySelector("mat-icon"), 
            matContent = matPanel.querySelector(".mat-expansion-panel-content");

        el.classList.remove("open");
        matPanel.classList.remove("mat-expanded");
        if (matPanelHead !== null) {
            matPanelHead.classList.remove("mat-expanded");
            matPanelHead.setAttribute("aria-expanded", "false");
        }
        if (matContent !== null) {
            matContent.style.height = "0px";
            matContent.style.visibility = "hidden";
        }
        if (matIcon.textContent === expandMenuState.Close) {
            matIcon.textContent = expandMenuState.Open;
        }
    }, 
    clearLinks = function (activeEl) {
        let matPanel = activeEl.closest("mat-expansion-panel");

        for (let linkTag of navLink) {
            if (linkTag.classList.contains("quartz-expand-sidenav-button") === true && matPanel !== linkTag.closest("mat-expansion-panel")) {
                resetAccordion(linkTag);
            } else {
                linkTag.classList.remove("active-link");
            }
        }
    }, 
    openAccordion = function (el) {
        let matPanel = el.closest("mat-expansion-panel"), 
            matIcon = matPanel.querySelector("mat-icon"), 
            matContent = matPanel.querySelector(".mat-expansion-panel-content"), 
            expandMenuState = { Open: " chevron_right ", Close: " expand_more " }, 
            matPanelHead = el.closest("mat-expansion-panel-header"), 
            rootExpandLink = matPanel.getElementsByTagName("a")[0];

        if (rootExpandLink !== undefined) {
            clearLinks(el);
            rootExpandLink.classList.add("open");
        }
        matPanel.classList.add("mat-expanded");
        if (matPanelHead !== null) {
            matPanelHead.classList.add("mat-expanded");
            matPanelHead.setAttribute("aria-expanded", "true");
        }
        if (matContent !== null) {
            matContent.style.height = "";
            matContent.style.visibility = "";
        }
        if (matIcon.textContent === expandMenuState.Open) {
            matIcon.textContent = expandMenuState.Close;
        }
    }, 
    accordionActivate = function () {
        let matPanel = this.closest("mat-expansion-panel");

        if (matPanel.classList.contains("mat-expanded") === false) {
            openAccordion(this);
        } else {
            resetAccordion(this);
        }
    }, 
    selectSideElm = function () {
        if (this.classList.contains("active-link") === false) {
            clearLinks(this);
            this.classList.add("active-link");
        }
    }, 
    showHideMenu = function (showMenu) {
        let sideNavContain = document.querySelector("mat-sidenav-container"), 
            sideNav = document.querySelector("mat-sidenav"), 
            backdropEl = document.querySelector(".mat-drawer-backdrop");

        if (showMenu !== true && sideNav.classList.contains("mat-drawer-opened") === true && document.querySelector("mat-sidenav-content") !== null) {
            //Hide side navigation
            sideNavContain.classList.remove("mat-drawer-container-has-open");
            sideNav.classList.remove("mat-drawer-opened");
            backdropEl.classList.remove("mat-drawer-shown");
            backdropEl.removeEventListener("click", hideSideNav);

            sideNav.style.transform = "";
            sideNav.style.boxShadow = "none";
            sideNav.style.visibility = "hidden";
        } else {
            //Show side navigation
            sideNavContain.classList.add("mat-drawer-container-has-open");
            sideNav.classList.add("mat-drawer-opened");
            if (globalThis.innerWidth < 960 && document.querySelector("mat-sidenav-content") !== null) {
                backdropEl.classList.add("mat-drawer-shown");
                backdropEl.addEventListener("click", hideSideNav);
            }
            sideNav.style.transform = "none";
            sideNav.style.boxShadow = "";
            sideNav.style.visibility = "visible";
        }
    }, 
    hideSideNav = function () {
        showHideMenu(false);
        tabRefresh();
    }, 
    enableTabStartBtn = function (container) {
        let tabStart = container.querySelector(".mat-ripple.mat-mdc-tab-header-pagination.mat-mdc-tab-header-pagination-before");

        tabStart.classList.remove("mat-mdc-tab-header-pagination-disabled");
        tabStart.classList.add("mat-mdc-tab-header-pagination-enabled");
        tabStart.removeAttribute("disabled");
    }, 
    disableTabStartBtn = function (container) {
        let tabStart = container.querySelector(".mat-ripple.mat-mdc-tab-header-pagination.mat-mdc-tab-header-pagination-before");

        tabStart.classList.add("mat-mdc-tab-header-pagination-disabled");
        tabStart.classList.remove("mat-mdc-tab-header-pagination-enabled");
        tabStart.setAttribute("disabled", "disabled");
    }, 
    enableTabEndBtn = function (container) {
        let tabEnd = container.querySelector(".mat-ripple.mat-mdc-tab-header-pagination.mat-mdc-tab-header-pagination-after");

        tabEnd.classList.add("mat-mdc-tab-header-pagination-enabled");
        tabEnd.classList.remove("mat-mdc-tab-header-pagination-disabled");
        tabEnd.removeAttribute("disabled");
    }, 
    disableTabEndBtn = function (container) {        
        let tabEnd = container.querySelector(".mat-ripple.mat-mdc-tab-header-pagination.mat-mdc-tab-header-pagination-after");

        tabEnd.classList.remove("mat-mdc-tab-header-pagination-enabled");
        tabEnd.classList.add("mat-mdc-tab-header-pagination-disabled");
        tabEnd.setAttribute("disabled", "disabled");
    }, 
    tabRefresh = function () {
        let tabGroups = document.querySelectorAll("mat-tab-header");

        if (tabGroups !== null && tabGroups !== undefined) {
            tabGroups.forEach(function (container) {
                let currentTabs = container.querySelectorAll("[role='tab']"), 
                    tabList = container.querySelector(".mat-mdc-tab-list"), 
                    totalTabsWidth = Array.from(currentTabs).reduce(function (sum, tab) {
                        return sum + tab.getBoundingClientRect().width;
                    }, 0);

                if (totalTabsWidth > container.getBoundingClientRect().width) {
                    container.classList.add("mat-mdc-tab-header-pagination-controls-enabled");
                    disableTabStartBtn(container);
                    enableTabEndBtn(container);
                } else {
                    container.classList.remove("mat-mdc-tab-header-pagination-controls-enabled");
                    disableTabStartBtn(container);
                    disableTabEndBtn(container);
                    tabList.style.transform = "translateX(0px)";
                }
            });
        }
    }, 
    reSizeAction = function () {
        let backdropEl = document.querySelector(".mat-drawer-backdrop"), 
            altLangLnk = document.querySelector("[lang='fr']"), 
            sideNav = document.querySelector("mat-sidenav"), 
            smallPageView = function (hideSideNavFlag) {
                let footEl;
                const sideMenuIcon = document.querySelector("quartz-icon-button"), 
                    sideNavContain = document.querySelector("mat-sidenav-container"), 
                    sideNavContent = document.querySelector("mat-sidenav-content"), 
                    ribbonTitle = document.querySelector(".quartz-ribbon-menu-title"), 
                    ribbonSubTitle = document.querySelector(".quartz-ribbon-menu-subtitle"), 
                    footLink = document.querySelector(".link-wrap");

                if (hideSideNavFlag === true) {
                    // large screen UI adjustments
                    sideNavContain.classList.remove("mat-drawer-transition");
                    if (sideNavContent !== null) {
                        sideMenuIcon.classList.add("quartz-invisible");
                        sideNavContent.style.marginLeft = "280px";
                        sideNav.classList.add("mat-drawer-side");
                        sideNav.classList.remove("mat-drawer-over");
                        sideNav.classList.add("mat-drawer-opened");
                    }
                    ribbonTitle.classList.remove("quartz-invisible");
                    if (ribbonSubTitle !== null) {
                        ribbonSubTitle.classList.remove("quartz-invisible");
                    }
                    footLink.classList.add("footer-down");
                    footLink.classList.remove("footer-mobile-down");
                    footEl = document.querySelector(".footer-down, .footer-mobile.down");
                    footEl.classList.remove("column-count-one");
                    showHideMenu(true);
                } else {
                    // small screen UI adjustments
                    sideNavContain.classList.add("mat-drawer-transition");
                    if (sideNavContent !== null) {
                        sideMenuIcon.classList.remove("quartz-invisible");
                        sideNavContent.style.marginLeft = "";
                        sideNav.classList.add("mat-drawer-over");
                        sideNav.classList.remove("mat-drawer-side");
                    }
                    ribbonTitle.classList.add("quartz-invisible");
                    if (ribbonSubTitle !== null) {
                        ribbonSubTitle.classList.add("quartz-invisible");
                    }
                    footLink.classList.add("footer-mobile-down");
                    footLink.classList.remove("footer-down");
                    footEl = document.querySelector(".footer-down, .footer-mobile.down");
                    footEl.classList.add("column-count-one");
                }
                tabRefresh();
            };

        if (globalThis.innerWidth < 768) {
            altLangLnk.textContent = "fr";
        } else {
            altLangLnk.textContent = "Français";
        }
        if (globalThis.innerWidth < 960) {
            smallPageView(false);
            if (sideNav !== null && sideNav!== "" && sideNav.classList.contains("mat-drawer-opened") === true && document.querySelector("mat-sidenav-content") !== null) {
                backdropEl.classList.add("mat-drawer-shown");
                backdropEl.addEventListener("click", hideSideNav);
            }
        } else {
            smallPageView(true);
            if (sideNav !== null && sideNav!== "" && sideNav.classList.contains("mat-drawer-opened") === true && document.querySelector("mat-sidenav-content") !== null) {
                backdropEl.classList.remove("mat-drawer-shown");
                backdropEl.removeEventListener("click", hideSideNav);
            }
        }
    }, 
    showLoginMenu = function () {
        let menuTrigger = document.querySelector(".mat-mdc-menu-trigger"), 
            hideprofileMenu = function () {
                showProfileMenu(true);
            }, 
            showProfileMenu = function (showMenu) {
                let accountBtnPos = accountBtn.getBoundingClientRect(), 
                    backdropTrigger = document.querySelector(".cdk-overlay-container"), 
                    overlayBG = document.querySelector(".cdk-overlay-transparent-backdrop"), 
                    profileMenu = document.querySelector(".cdk-overlay-connected-position-bounding-box");

                if (showMenu === true) {
                    menuTrigger.setAttribute("aria-expanded", "false");
                    backdropTrigger.classList.add("quartz-invisible");
                    overlayBG.classList.add("quartz-invisible");
                    backdropTrigger.removeEventListener("click", hideprofileMenu);
                    profileMenu.classList.add("quartz-invisible");
                } else {
                    menuTrigger.setAttribute("aria-expanded", "true");
                    backdropTrigger.classList.remove("quartz-invisible");
                    overlayBG.classList.remove("quartz-invisible");
                    backdropTrigger.addEventListener("click", hideprofileMenu);
                    profileMenu.style.top = accountBtnPos.bottom + "px";
                    if (globalThis.innerWidth < 960) {
                        profileMenu.style.left = accountBtnPos.left - 118.5 + "px";
                    } else {
                        profileMenu.style.left = accountBtnPos.left + "px";
                    }
                    profileMenu.classList.remove("quartz-invisible");
                }
            };

        if (menuTrigger.ariaExpanded === "true") {
            showProfileMenu(true);
        } else {
            showProfileMenu(false);
        }
    }, 
    gotoPage = function () {
        globalThis.location.href = this.value;
    }, 
    openDialog = function (overlayElm) {
        let overlayWrap = overlayElm.closest(".cdk-global-overlay-wrapper"), 
            closeButton = overlayElm.querySelector("quartz-secondary-button"), 
            closeIcon = overlayElm.querySelector("quartz-icon-button"), 
            htmlTag = document.getElementsByTagName("html")[0], 
            appRootTag = document.getElementsByTagName("app-root")[0], 
            backdropTrigger = document.querySelector(".cdk-overlay-container"), 
            overlayBG = document.querySelector(".cdk-overlay-dark-backdrop"), 
            endDialog = function () {
                htmlTag.classList.remove("cdk-global-scrollblock");
                htmlTag.style.left = "";
                htmlTag.style.top = "";
                appRootTag.ariaHidden = false;
                overlayElm.style.width = "";
                overlayElm.style.minWidth = "";
                overlayElm.style.position = "";
                overlayElm.classList.add("quartz-invisible");
                overlayWrap.classList.add("quartz-invisible");
                backdropTrigger.classList.add("quartz-invisible");
                overlayBG.classList.add("quartz-invisible");
                if (closeButton !== null && closeButton !== "") {
                    closeButton.removeEventListener("click", endDialog);
                }
                if (closeIcon !== null && closeIcon !== "") {
                    closeIcon.removeEventListener("click", endDialog);
                }
            }, 
            closeOutsideClick = function (event) {
                // If the target of the click is the backdrop itself, close the modal
                if (event.target.closest("mat-dialog-container") === null) {                    
                    endDialog();
                    globalThis.removeEventListener("click", closeOutsideClick);
                }
            };

        globalThis.addEventListener("click", closeOutsideClick);
        if (htmlTag.classList.contains("cdk-global-scrollblock") === false) {
            htmlTag.classList.add("cdk-global-scrollblock");
            htmlTag.style.left = "0px;";
            htmlTag.style.top = "0px;";
            appRootTag.ariaHidden = true;
            overlayElm.style.width = "90%";
            overlayElm.style.minWidth = "598px";
            overlayElm.style.position = "static";
            overlayElm.classList.remove("quartz-invisible");
            overlayWrap.classList.remove("quartz-invisible");
            backdropTrigger.classList.remove("quartz-invisible");
            overlayBG.classList.remove("quartz-invisible");
            if (closeButton !== null && closeButton !== "") {
                closeButton.addEventListener("click", endDialog);
            }
            if (closeIcon !== null && closeIcon !== "") {
                closeIcon.addEventListener("click", endDialog);
            }
        }
    }, 
    checkboxActivate = function (checkBoxElm) {
        let checkLabel = checkBoxElm.querySelector("label.quartz-checkbox"), 
            checkState = checkBoxElm.querySelector("mat-icon.mat-icon.notranslate.material-icons.mat-ligature-font.mat-icon-no-color");

        if (checkLabel.classList.contains("quartz-checkbox-checked") === true) {
            checkLabel.classList.remove("quartz-checkbox-checked");
            checkState.innerHTML = "check_box_outline_blank";
        } else {
            checkLabel.classList.add("quartz-checkbox-checked");
            checkState.innerHTML = "check_box";
        }
    }, 
    radioActivate = function (radioElm) {
        let radioState, 
            radioLabel = radioElm.querySelector("label.quartz-radio-button"), 
            radioGroup = radioElm.closest("div.quartz-form-field-container"), 
            radioGroupLabels = radioGroup.querySelectorAll("label.quartz-radio-button");

        for (let currentRadioLabel of radioGroupLabels) {
            radioState = currentRadioLabel.querySelector("mat-icon.notranslate.material-icons.mat-ligature-font.mat-icon-no-color");
            if (currentRadioLabel === radioLabel && radioLabel.classList.contains("quartz-radio-button-checked") === false) {
                currentRadioLabel.classList.add("quartz-radio-button-checked");
                radioState.innerHTML = "radio_button_checked";
            } else {
                currentRadioLabel.classList.remove("quartz-radio-button-checked");
                radioState.innerHTML = "radio_button_unchecked";
            }
        }
    }, 
    isSectionValid = function (currentStep) {
        let isFormValid;
        const currentForm = currentStep.querySelector("form");

        if (currentForm !== null) {
            isFormValid = currentForm.checkValidity();
            if (isFormValid === false) {
                currentForm.reportValidity();
            }
            return isFormValid;
        }
        return true; // Return true if no form exists in this section
    }, 
    tabActivate = function () {
        let tabContent, 
            tabGroup = this.closest("quartz-tabs"), 
            tabHeadArr = tabGroup.querySelectorAll("[role='tab']"), 
            tabBodyArr = tabGroup.querySelectorAll("mat-tab-body");

        for (let i = 0; i < tabHeadArr.length; i++) {
            if (tabHeadArr[i] === this) {
                this.classList.add("mdc-tab--active", "mdc-tab-indicator--active");
                this.ariaSelected = true;
                this.tabindex = 0;
                if (tabBodyArr[i]) {
                    tabContent = tabBodyArr[i].querySelector(".mat-mdc-tab-body-content");
                    tabContent.style.transform = "none";
                    tabContent.style.minHeight = "";
                    tabBodyArr[i].ariaHidden = false;
                    tabBodyArr[i].classList.add("mat-mdc-tab-body-active");
                    tabContent.style.visibility = "";
                }
            } else {
                tabHeadArr[i].classList.remove("mdc-tab--active", "mdc-tab-indicator--active");
                tabHeadArr[i].ariaSelected = false;
                tabHeadArr[i].tabindex = -1;
                if (tabBodyArr[i]) {
                    tabContent = tabBodyArr[i].querySelector(".mat-mdc-tab-body-content");
                    tabBodyArr[i].ariaHidden = true;
                    tabContent.style.transform = "translate3d(-100%, 0px, 0px)";
                    tabContent.style.minHeight = "1px";
                    tabBodyArr[i].classList.remove("mat-mdc-tab-body-active");
                    tabContent.style.visibility = "hidden";
                }
            }
        }
    }, 
    tabScrollButtons = function (tabScrollBtn) {
        let matrixValues, currentAdjust, 
            tabHeaderElm = tabScrollBtn.closest("mat-tab-header"), 
            tabHeadWidth = tabHeaderElm.getBoundingClientRect().width - (tabScrollBtn.getBoundingClientRect().width * 2), 
            tabList = tabHeaderElm.querySelector(".mat-mdc-tab-list"), 
            translateX = 0,  // Default if no transform exists
            tabHeadadjustVal = 136;

        const btnStyle = globalThis.getComputedStyle(tabList), 
            matrix = btnStyle.transform || btnStyle.webkitTransform;

        if (matrix && matrix !== "none") {
            // Parses either "matrix(1, 0, 0, 1, -416, 0)" or 3D matrices
            matrixValues = /matrix.*\((.+)\)/.exec(matrix)[1].split(", ");
  
            // The 5th value (index 4) represents the X-axis translation
            translateX = Number.parseFloat(matrixValues[4]);
        }

        if (tabScrollBtn.classList.contains("mat-mdc-tab-header-pagination-before") === true) {
            enableTabEndBtn(tabHeaderElm);
            currentAdjust = tabHeadadjustVal + translateX;
            if (currentAdjust > 0) {
                currentAdjust = 0;
                disableTabStartBtn(tabHeaderElm);
            }
            tabList.style.transform = "translateX(" + currentAdjust + "px)";
        } else if (tabScrollBtn.classList.contains("mat-mdc-tab-header-pagination-after") === true) {
            enableTabStartBtn(tabHeaderElm);
            currentAdjust = -tabHeadadjustVal + translateX;
            if (Math.abs(currentAdjust) > tabHeadWidth) {
                currentAdjust = -tabHeadWidth;
                disableTabEndBtn(tabHeaderElm);
            }
            tabList.style.transform = "translateX(" + currentAdjust + "px)";
        }
    }, 
    changeStep = function (lastStep, newStep, direction) {
        let lastSection = lastStep.querySelector("div.mat-vertical-content-container"), 
            lastStepLabel = lastStep.querySelector(".mat-step-label"), 
            newSection = newStep.querySelector("div.mat-vertical-content-container"), 
            newStepLabel = newStep.querySelector(".mat-step-label"), 
            lastStepIcon = lastStep.querySelector(".mat-step-icon"), 
            newStepIcon = newStep.querySelector(".mat-step-icon"), 
            lastStepIconContent = lastStep.querySelector(".mat-step-icon-content"), 
            newStepIconContent = newStep.querySelector(".mat-step-icon-content"), 
            lastStepCntIcon = lastStepIconContent.querySelector(".stepper-index, span.stepper-icon:not(mat-icon)"), 
            newStepCntIcon = newStepIconContent.querySelector(".stepper-index, span.stepper-icon:not(mat-icon)"), 
            lastStepMatIcon = lastStepIconContent.querySelector(".stepper-icon:has(> mat-icon)"), 
            newStepMatIcon = newStepIconContent.querySelector(".stepper-icon:has(> mat-icon)");

        lastStepIcon.classList.remove("mat-step-icon-state-edit", "mat-step-icon-selected");
        newStepIcon.classList.add("mat-step-icon-state-edit", "mat-step-icon-selected");
        lastStepLabel.classList.remove("mat-step-label-selected");
        lastSection.classList.remove("mat-vertical-content-container-active");
        lastSection.setAttribute("inert", "");
        newSection.removeAttribute("inert");
        newSection.classList.add("mat-vertical-content-container-active");
        newStepLabel.classList.add("mat-step-label-selected");
        if (direction === 1) {
            lastStepIcon.classList.add("mat-step-icon-state-done");
            lastStepIcon.classList.remove("mat-step-icon-state-number");
            lastStepLabel.classList.add("mat-step-label-active");
            newStepLabel.classList.add("mat-step-label-active");
            lastStepCntIcon.classList.add("quartz-invisible");
            lastStepMatIcon.classList.remove("quartz-invisible");
        }
        if (direction === -1) {
            lastStepIcon.classList.remove("mat-step-icon-state-done");
            lastStepIcon.classList.add("mat-step-icon-state-number");
            lastStepLabel.classList.remove("mat-step-label-active");
            newStepLabel.classList.remove("mat-step-label-active");
            newStepCntIcon.classList.remove("quartz-invisible");
            newStepMatIcon.classList.add("quartz-invisible");
        }
    };

for (let navLinkElm of navLink) {
    if (navLinkElm.classList.contains("quartz-expand-sidenav-button") === true) {
        navLinkElm.addEventListener("click", accordionActivate);
    } else {
        navLinkElm.addEventListener("click", selectSideElm);
    }
}

if (contentSection.length > 1) {
    accordions = contentSection[0].getElementsByTagName("mat-expansion-panel");
    for (let accordion of accordions) {
        expandHideBtn = accordion.getElementsByTagName("mat-panel-title");
        expandHideBtn[0].addEventListener("click", accordionActivate);
    }
}

for (let dialog of dialogs) {
    let ovelayElm = dialog.popoverTargetElement;

    ovelayElm.style.removeProperty("width");
    ovelayElm.style.removeProperty("min-width");
    ovelayElm.style.removeProperty("position");
    dialog.addEventListener("click", function (event) {
        event.stopPropagation();
        openDialog(ovelayElm);
    });
}

for (let LinkBtn of linkBtns) {
    LinkBtn.addEventListener("click", gotoPage);
}

for (let printBtn of printBtns) {
    printBtn.addEventListener("click", function () {print();});
}

sideMenuBtn[0].addEventListener("click", showHideMenu);
if (sideNav !== null && sideNav !== undefined) {
    sideNav.classList.add("mat-drawer-opened");
    showHideMenu(true);
}

if (accountBtn !== null) {
    accountBtn.addEventListener("click", showLoginMenu);
}

globalThis.onresize = reSizeAction;
reSizeAction();

anchorUri = document.location.hash;
if (anchorUri !== null && anchorUri !== undefined && anchorUri !== "") {
    anchorEl = document.querySelector("[href='" + anchorUri + "']");
    if (anchorEl !== null && anchorEl !== undefined) {
        expansionPanel = anchorEl.closest("mat-expansion-panel");
        if (expansionPanel !== null && expansionPanel !== undefined) {
            accordionActivate.call(anchorEl);
        } else {
            selectSideElm.call(anchorEl);
        }
    }
}

for (let checkbox of checkboxes) {
    checkbox.addEventListener("click", function (event) {
        checkboxActivate(this);
        event.preventDefault();
    });
}

for (let radio of radios) {
    radio.addEventListener("click", function (event) {
        radioActivate(this);
        event.preventDefault();
    });
}

stepContainer.forEach(function (currentStep, index) {
    // Find nested "Next" buttons matching the exact class list
    const nextButtons = currentStep.querySelectorAll("div.mat-vertical-content-container button.mdc-button.mat-mdc-button-base.quartz-button.quartz-primary-button.mat-mdc-button.mat-unthemed"), 
        backButtons = currentStep.querySelectorAll("div.mat-vertical-content-container button.mdc-button.mat-mdc-button-base.quartz-button.quartz-link-button.mat-mdc-button.mat-unthemed"), 
        iconContent = currentStep.querySelector("div.mat-step-icon-content"), 
        stepIcon = iconContent.querySelector("span.stepper-index, span.stepper-icon"), 
        matIcon = iconContent.querySelector("mat-icon"), 
        doneIconElm = `<span class="stepper-icon quartz-invisible"><mat-icon role="img" class="mat-icon notranslate mat-step-icon-content material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">done</mat-icon></span>`;

    if (matIcon === null || matIcon.value === "") {
        stepIcon.insertAdjacentHTML("afterend", doneIconElm);
    }

    nextButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            let nextSection;

            if (isSectionValid(currentStep) === true) {
                nextSection = stepContainer[index + 1];
                if (nextSection !== undefined) {
                    changeStep(currentStep, nextSection, 1);
                }
            }
            event.preventDefault();
        });
    });

    // Find nested "Back" buttons matching the exact class list
    backButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            let priorSection;

            priorSection = stepContainer[index - 1];
            if (priorSection !== undefined) {
                changeStep(currentStep, priorSection, -1);
            }
            event.preventDefault();
        });
    });
});

for (let tabGroup of pageTabs) {
    tabs = tabGroup.querySelectorAll("[role='tab']");
    for (let tab of tabs) {
        tab.addEventListener("click", tabActivate);
    }
    tabBtns = tabGroup.querySelectorAll("mat-tab-header .mat-ripple.mat-mdc-tab-header-pagination");
    for (let tabBtn of tabBtns) {
        tabBtn.addEventListener("click", function (event) {
            tabScrollButtons(this);
            event.preventDefault();
        });
    }
}

// Select all tables on the page
for (let table of tables) {
    tableHeaders = table.querySelectorAll("th.mat-sort-header");
    tableElm = document.querySelector("table");
    
    // Set up tracking variables specific to this table instance
    tableElm.currentColumnIndex = -1;
    tableElm.isAscending = true;

    for (let tableHead of tableHeaders) {
        tableHead.addEventListener("click", function () {
            // Find the parent table of the clicked header
            let currentTable = this.closest("table"), 
                sortIndicator = this.querySelector(".mat-sort-header-container"), 
                tbody = currentTable.querySelector("tbody"), 
                // Get the index of the clicked column header
                childrenArray = Array.from(this.parentNode.children), 
                columnIndex = childrenArray.indexOf(this), 
                // Extract all rows from the table body
                rows = Array.from(tbody.querySelectorAll("tr")), 
            
                // Sort the rows array
                sortedRows = rows.slice().sort(function (rowA, rowB) {
                    let valueA, valueB, 
                        cellA = rowA.children[columnIndex].textContent.trim(), 
                        cellB = rowB.children[columnIndex].textContent.trim();

                    // Parse cellA as a number if it is numeric
                    if (isNaN(cellA) === true) {
                        valueA = cellA;
                    } else {
                        valueA = Number.parseFloat(cellA);
                    }

                    // Parse cellB as a number if it is numeric
                    if (isNaN(cellB) === true) {
                        valueB = cellB;
                    } else {
                        valueB = Number.parseFloat(cellB);
                    }

                    // Apply sorting logic based on current direction
                    if (valueA < valueB) {
                        if (currentTable.isAscending === true) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                    if (valueA > valueB) {
                        if (currentTable.isAscending === true) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                    return 0;
                }), 
                // Reset sort attributes on all headers within this table
                allHeaders = currentTable.querySelectorAll("th.mat-sort-header");
           
            // Toggle direction if clicking the same column; default to asc for a new column
            if (columnIndex === currentTable.currentColumnIndex) {
                if (currentTable.isAscending === true) {
                    currentTable.isAscending = false;
                } else {
                    currentTable.isAscending = true;
                }
            } else {
                currentTable.isAscending = true;
                currentTable.currentColumnIndex = columnIndex;
            }

            // Re-append rows to the tbody in the new sorted order
            tbody.append.apply(tbody, sortedRows);

            allHeaders.forEach(function () {
                sortIndicator.classList.remove("mat-sort-header-sorted", "mat-sort-header-descending", "mat-sort-header-ascending");
            });

            // Apply direction attribute to the active header
            if (currentTable.isAscending === true) {
                sortIndicator.classList.add("mat-sort-header-sorted", "mat-sort-header-ascending");
                sortIndicator.classList.remove("mat-sort-header-descending");
            } else {
                sortIndicator.classList.add("mat-sort-header-sorted", "mat-sort-header-descending");
                sortIndicator.classList.remove("mat-sort-header-ascending");
            }
        });
    }
}

for (let currentForm of allForms) {
    let formSubmitBtn = currentForm.querySelector("input[type='submit'], button[type='submit']");

    if (formSubmitBtn !== null && formSubmitBtn !== undefined) {
        formSubmitBtn.addEventListener("click", function (event) {
            // Convert the form elements collection into an array and loop through it
            Array.from(currentForm.elements).forEach(function (field) {
                let errorGroupElm, labelElm, radioBtn, radioElm, 
                    fieldGroup = field.closest("quartz-form-field-group"), 
                    handleInvalidField = function handleInvalidField(field, fieldGroup, errorGroupElm, labelElm, radioBtn) {
                        let errorFieldElm;

                        field.classList.add("quartz-invalid");
                        errorFieldElm = fieldGroup.querySelector("quartz-field-error");
                        if (errorGroupElm !== null && errorGroupElm !== undefined) {
                            errorGroupElm.classList.add("quartz-invalid");
                        }
                        if (labelElm !== null && labelElm !== undefined) {
                            labelElm.classList.add("quartz-invalid");
                        }
                        if (radioBtn !== null && radioBtn !== undefined) {
                            radioBtn.classList.add("quartz-invalid");
                        }
                        if (errorFieldElm !== null && errorFieldElm !== undefined) {
                            errorFieldElm.innerHTML = `<span role="alert" aria-live="polite" class="quartz-field-error" id="dollar-error"><span class="errors-container"><span class="errors-wrap"><span class="icon-wrap"><mat-icon role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font">error</mat-icon></span><span>Error: ${field.validationMessage}</span></span></span></span>`;
                        }
                    };

                // Clear previous styling/errors first
                field.classList.remove("quartz-invalid");
                if (fieldGroup !== null && fieldGroup !== undefined) {
                    // Ignore buttons, fieldsets, or elements without validation needs
                    errorGroupElm = fieldGroup.querySelector("div[role='group']");
                    if (errorGroupElm !== null && errorGroupElm !== undefined) {
                        errorGroupElm.classList.remove("quartz-invalid");
                    }
                    labelElm = fieldGroup.querySelector("label.quartz-checkbox");
                    if (labelElm !== null && labelElm !== undefined) {
                        labelElm.classList.remove("quartz-invalid");
                    }
                    radioElm = field.closest("quartz-radio-button");
                    if (radioElm !== null && radioElm !== undefined) {
                        radioBtn = radioElm.querySelector("mat-icon");
                        if (radioBtn !== null && radioBtn !== undefined) {
                            radioBtn.classList.remove("quartz-invalid");
                        }
                    }
                    if (field.willValidate === true) {
                        // Check if the individual field fails its HTML constraints
                        if (field.validity.valid !== true) {
                            event.preventDefault();
                            handleInvalidField(field, fieldGroup, errorGroupElm, labelElm, radioBtn); 
                        }
                    }
                }
            });
        });
    }
}
/*

Accordion (done)
Checkbox (done)
Dialog (done)
form validation (done - needs review)
Radio buttons (done)
SideNav (done)
Stepper (done)
Sub Ribbon (done)
Table (done) - sort arrows could use some polishing (table with selection)
Tabs (done)

Form validation
Date picker, date range picker
Filter
Paginator
Task dialog?
Snackbar

multi column
Grid
Margin

Menu?
-------

-------

make elements into ajaxed components
see if I can make exact working copy of quartz demo page 

button form="form_id" *formaction="url"* popovertarget="element_id" value=""
.quartz-sidenav .mat-drawer-content {
    min-height: 100vh;
}

*/