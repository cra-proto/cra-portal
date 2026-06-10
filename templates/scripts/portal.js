"use strict";

let anchorUri,
    anchorEl,
    expandHideBtn,
    quartzSideNav = document.getElementsByTagName("quartz-sidenav"),
    navLink = quartzSideNav[0].getElementsByTagName("a"),
    contentSection = document.getElementsByTagName("mat-drawer-content"),
    accordions = contentSection[0].getElementsByTagName("mat-expansion-panel"),
    sideNav = document.querySelector("mat-sidenav"),
    accountBtn = document.querySelector(".quartz-primary-button"),
    sdMenuBtn = document.getElementsByTagName("quartz-icon-button"),
    sideMenuBtn = sdMenuBtn[0].getElementsByTagName("button"),
    printBtns = document.querySelectorAll("button[value='print']"),
    linkBtns = document.querySelectorAll("button[value^='http']"),
    tabs = document.querySelectorAll("[role='tab']"),
    dialogs = document.querySelectorAll("button[popovertarget]"), 
    stepContainer = document.querySelectorAll(".mat-vertical-content-container.mat-stepper-vertical-line"), 
    accordionActivate = function () {
        let matPanel = this.closest("mat-expansion-panel"),
            matIcon = matPanel.querySelector("mat-icon"),
            matContent = matPanel.querySelector(".mat-expansion-panel-content"),
            expandMenuState = { Open: " chevron_right ", Close: " expand_more " },
            matPanelHead = this.closest("mat-expansion-panel-header"),
            rootExpandLink = matPanel.getElementsByTagName("a")[0];

        if (matPanel.classList.contains("mat-expanded") === false) {
            if (rootExpandLink !== undefined) {
                clearLinks(this);
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
        } else {
            resetAccordion(this);
        }
    },
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
    selectSideElm = function () {
        if (this.classList.contains("active-link") === false) {
            clearLinks(this);
            this.classList.add("active-link");
        }
    },
    hideSideNav = function () {
        showHideMenu(false);
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
            backdropEl.removeEventListener("click", hideSideNav, false);

            sideNav.style.transform = "";
            sideNav.style.boxShadow = "none";
            sideNav.style.visibility = "hidden";
        } else {
            //Show side navigation
            sideNavContain.classList.add("mat-drawer-container-has-open");
            sideNav.classList.add("mat-drawer-opened");
            if (globalThis.innerWidth < 960 && document.querySelector("mat-sidenav-content") !== null) {
                backdropEl.classList.add("mat-drawer-shown");
                backdropEl.addEventListener("click", hideSideNav, false);
            }
            sideNav.style.transform = "none";
            sideNav.style.boxShadow = "";
            sideNav.style.visibility = "visible";
        }
    }, 
    reSizeAction = function () {
        let backdropEl = document.querySelector(".mat-drawer-backdrop"),
            altLangLnk = document.querySelector("[lang='fr']"),
            sideNav = document.querySelector("mat-sidenav"),
            smallPageView = function (hideSideNavFlag) {
                let footEl;
                const tabGroups = document.querySelectorAll("mat-tab-header"), 
                    sideMenuIcon = document.querySelector("quartz-icon-button"),
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
                tabGroups.forEach(function (container) {
                    const tabs = container.querySelectorAll("[role='tab']");

                    const totalTabsWidth = Array.from(tabs).reduce(function (sum, tab) {
                        return sum + tab.getBoundingClientRect().width;
                    }, 0);

                    const tablistWidth = container.getBoundingClientRect().width;

                    if (totalTabsWidth > tablistWidth) {
                        container.classList.add("mat-mdc-tab-header-pagination-controls-enabled");
                    } else {
                        container.classList.remove("mat-mdc-tab-header-pagination-controls-enabled");
                    }
                });
            };

        if (globalThis.innerWidth < 768) {
            altLangLnk.textContent = "fr";
        } else {
            altLangLnk.textContent = "Français";
        }
        if (globalThis.innerWidth < 960) {
            smallPageView(false);
            if (sideNav.classList.contains("mat-drawer-opened") === true && document.querySelector("mat-sidenav-content") !== null) {
                backdropEl.classList.add("mat-drawer-shown");
                backdropEl.addEventListener("click", hideSideNav, false);
            }
        } else {
            smallPageView(true);
            if (sideNav.classList.contains("mat-drawer-opened") === true && document.querySelector("mat-sidenav-content") !== null) {
                backdropEl.classList.remove("mat-drawer-shown");
                backdropEl.removeEventListener("click", hideSideNav, false);
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
                    backdropTrigger.removeEventListener("click", hideprofileMenu, false);
                    profileMenu.classList.add("quartz-invisible");
                } else {
                    menuTrigger.setAttribute("aria-expanded", "true");
                    backdropTrigger.classList.remove("quartz-invisible");
                    overlayBG.classList.remove("quartz-invisible");
                    backdropTrigger.addEventListener("click", hideprofileMenu, false);
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
    openDialog = function () {
        let overlayElm = this.popoverTargetElement, 
            overlayWrap = overlayElm.closest(".cdk-global-overlay-wrapper"),
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
                closeButton.removeEventListener("click", endDialog, false);
                closeIcon.removeEventListener("click", endDialog, false);
            };

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
            closeButton.addEventListener("click", endDialog, false);
            closeIcon.addEventListener("click", endDialog, false);
        }
    },
    isSectionValid = function (currentStep) {
        const currentForm = currentStep.querySelector("form");
        let isFormValid;

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
    stepperNext = function (currentStep, nextSection) {
//        console.log("Next");
    }, 
    stepperBack = function (currentStep, priorSection) {
//        console.log("Back");
    };

for (let navLinkElm of navLink) {
    if (navLinkElm.classList.contains("quartz-expand-sidenav-button") === true) {
        navLinkElm.addEventListener("click", accordionActivate, false);
    } else {
        navLinkElm.addEventListener("click", selectSideElm, false);
    }
}

for (let accordion of accordions) {
    expandHideBtn = accordion.getElementsByTagName("mat-panel-title");
    expandHideBtn[0].addEventListener("click", accordionActivate, false);
}

for (let tab of tabs) {
    tab.addEventListener("click", tabActivate, false);
}

for (let LinkBtn of linkBtns) {
    LinkBtn.addEventListener("click", gotoPage, false);
}

for (let printBtn of printBtns) {
    printBtn.addEventListener("click", function() {print();}, false);
}

for (let dialog of dialogs) {
    dialog.addEventListener("click", openDialog, false);
}

sideMenuBtn[0].addEventListener("click", showHideMenu, false);
sideNav.classList.add("mat-drawer-opened");
showHideMenu(true);

if (accountBtn !== null) {
    accountBtn.addEventListener("click", showLoginMenu, false);
}

globalThis.onresize = reSizeAction;
reSizeAction();

anchorUri = document.location.hash;
if (anchorUri) {
    anchorEl = document.querySelector("[href='" + anchorUri + "']");
    if (anchorEl) {
        anchorEl.closest("mat-expansion-panel");
        if (anchorEl.closest("mat-expansion-panel")) {
            accordionActivate.call(anchorEl);
        } else {
            selectSideElm.call(anchorEl);
        }
    }
}

stepContainer.forEach(function (currentStep, index) {
    // Find nested "Next" buttons matching the exact class list
    const nextButtons = currentStep.querySelectorAll("button.mdc-button.mat-mdc-button-base.quartz-button.quartz-primary-button.mat-mdc-button.mat-unthemed"), 
        backButtons = currentStep.querySelectorAll("button.mdc-button.mat-mdc-button-base.quartz-button.quartz-link-button.mat-mdc-button.mat-unthemed");

    nextButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            let nextSection;

            if (isSectionValid(currentStep) === true) {
                nextSection = stepContainer[index + 1];
                if (nextSection !== "undefined") {
                    stepperNext(currentStep, nextSection);
                }
            }
        });
    });

    // Find nested "Back" buttons matching the exact class list

    backButtons.forEach(function (button) {
        button.addEventListener("click", function () {
           let priorSection;

            if (isSectionValid(currentStep) === true) {
                priorSection = stepContainer[index - 1];
                if (priorSection !== "undefined") {
                    stepperBack(currentStep, priorSection);
                }
            }
        });
    });
});
/*

Accordion (done)
Dialog (done)
Sub Ribbon (done)
Tabs (in progress)
stepper (in progress)

multi column
Grid

Filter
-------

-------

make elements into ajaxed components
see if I can make exact working copy of quartz demo page 

Stepper

checkbox (all/partial checked indicator)

button form="form_id" *formaction="url"* popovertarget="element_id" value=""  
.quartz-sidenav .mat-drawer-content {
    min-height: 100vh;
}

*/