function initGlobals() {
    /**
     * boolean = true : if main BBO panel displayed
     */
    navDivDisplayed = false;
    /**
     * boolean = true : if bidding box exists
     * Bidding box element is created when the table
     * is displayed
     */
    biddingBoxExists = false;
    /**
     * boolean = true : if bidding box is displayed
     */
    biddingBoxDisplayed = false;
    /**
     * boolean = true : when opponents ask more info
     */
    explainCallDisplayed = false;
    /**
     * boolean = true : during the auction
     */
    auctionBoxDisplayed = false;
    /**
     * string : contains current board number
     */
    lastDealNumber = '';
    /**
     * string : contains LHO user id
     */
    LHOpponent = '';
    /**
     * string : contains RHO user id
     */
    RHOpponent = '';
    /**
     * string = 'L' when LHO changed or 'R' when RHO changed
     */
    opponentChanged = '';
    /**
     * string : contains current auction
     */
    currentAuction = '??';
    /**
     * string : contains current active player direction and uid
     */
    activePlayer = '';
    lastSelectedCall = '';
    cardLead = '';
    playedCards = '';
    callExplanationPanelDisplayed = false;
    myCardsDisplayed = '';
    dealEndPanelDisplayed = false;
    announcemenDisplayed = false;
    finalContractDisplayed = false;
    announcementText = '';
    notificationDisplayed = false;
    notificationText = '';
    lastChatMessage = '';
    lastUserExplanation = '';
    recordNewAlerts = true;
    userData = {};
    blogNames = [];
    blogIds = [];
    ctxArray = [];
    allBids = [];
    allBids = bidArray("1C1D1H1S1N2C2D2H2S2N3C3D3H3S3N4C4D4H4S4N5C5D5H5S5N6C6D6H6S6N7C7D7H7S7N");
    apiKey = "AIzaSyBDC18V7_Sw4fIHoIkOR40nRPMZAuW2QMk";
    // Release notes : stable version
    srcRelnotes = "https://stanmaz.github.io/bboalert.github.io/";
//    srcRelnotes = "https://docs.google.com/document/d/e/2PACX-1vQ_8Iv9HbBj4nWDXSY_kHsW1ZP_4c4dbOVO0GLuObJc1vFu_TBg9oV6ZJXMWd_tLITOj7i6WaJBeZJI/pub";
    // Release notes : beta version
//    srcRelnotes = "https://docs.google.com/document/d/e/2PACX-1vQlUHDS_XUimLvS722emrPw5Bzpyjm8lPKxZ9jwVwOVJVq0zQd3fawML8sylwxYIGKiZB60eJENB2TG/pub";
}

initGlobals();


const E_onAnyMutation = new Event('onAnyMutation');
const E_onBiddingBoxCreated = new Event('onBiddingBoxCreated');
const E_onBiddingBoxDisplayed = new Event('onBiddingBoxDisplayed');
const E_onBiddingBoxHidden = new Event('onBiddingBoxHidden');
const E_onAuctionBoxDisplayed = new Event('onAuctionBoxDisplayed');
const E_onAuctionBegin = new Event('onAuctionBegin');
const E_onAuctionBoxHidden = new Event('onAuctionBoxHidden');
const E_onAuctionEnd = new Event('onAuctionEnd');
const E_onFinalContractDisplayed = new Event('onFinalContractDisplayed');
const E_onNewAuction = new Event('onNewAuction');
const E_onNewActivePlayer = new Event('onNewActivePlayer');
const E_onExplainCallDisplayed = new Event('onExplainCallDisplayed');
const E_onExplainCallHidden = new Event('onExplainCallHidden');
const E_onBiddingBoxRemoved = new Event('onBiddingBoxRemoved');
const E_onLogin = new Event('onLogin');
const E_onLogoff = new Event('onLogoff');
const E_onAnyOpponentChange = new Event('onAnyOpponentChange');
const E_onNewDeal = new Event('onNewDeal');
const E_onNewCallSelected = new Event('onNewCallSelected');
const E_onCallLevelSelected = new Event('onCallLevelSelected');
const E_onMyLead = new Event('onMyLead');
const E_onNewPlayedCard = new Event('onNewPlayedCard');
const E_onCallExplanationPanelDisplayed = new Event('onCallExplanationPanelDisplayed');
const E_onMyCardsDisplayed = new Event('onMyCardsDisplayed');
const E_onDealEnd = new Event('onDealEnd');
const E_onAnnouncementDisplayed = new Event('onAnnouncementDisplayed');
const E_onNotificationDisplayed = new Event('onNotificationDisplayed');
const E_onNewChatMessage = new Event('onNewChatMessage');
const E_onDataLoad = new Event('onDataLoad');
const E_onFindAlertStart = new Event('onFindAlertStart');
const E_onFindAlertEnd = new Event('onFindAlertEnd');


// Options for the observer (which mutations to observe)
const config = {
    attributes: true,
    attributeFilter: ['id', 'class', 'style'],
    childList: true,
    subtree: true
};

// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
    observer.disconnect();
    if ((getBiddingBox() != null) != biddingBoxExists) {
        biddingBoxExists = !biddingBoxExists;
        if (biddingBoxExists) onBiddingBoxCreated();
        else onBiddingBoxRemoved();
    }
    if (isVisible(getNavDiv()) != navDivDisplayed) {
        navDivDisplayed = !navDivDisplayed;
        if (navDivDisplayed) onNavDivDisplayed();
        else onNavDivHidden();
    }
    if (isVisible(getBiddingBox()) != biddingBoxDisplayed) {
        biddingBoxDisplayed = !biddingBoxDisplayed;
        if (biddingBoxDisplayed) onBiddingBoxDisplayed();
        else onBiddingBoxHidden();
    }
    if (isVisible(getAuctionBox()) != auctionBoxDisplayed) {
        auctionBoxDisplayed = !auctionBoxDisplayed;
        if (auctionBoxDisplayed) onAuctionBoxDisplayed();
        else onAuctionBoxHidden();
    }
    if (isVisible(getAnnouncementPanel()) != announcemenDisplayed) {
        announcemenDisplayed = !announcemenDisplayed;
        if (announcemenDisplayed) onAnnouncementDisplayed();
    }
    if (isVisible(getNotificationPanel()) != notificationDisplayed) {
        notificationDisplayed = !notificationDisplayed;
        if (notificationDisplayed) onNotificationDisplayed();
    }
    if (isVisible(getFinalContractPanel()) != finalContractDisplayed) {
        finalContractDisplayed = !finalContractDisplayed;
        if (finalContractDisplayed) onFinalContractDisplayed();
    }
    if (currentAuction != getContext()) {
        currentAuction = getContext();
        onNewAuction();
    }
    if (activePlayer != getActivePlayer()) {
        activePlayer = getActivePlayer();
        callText = '';
        lastSelectedCall = callText;
        if (activePlayer != '') onNewActivePlayer();
    }
    if (isVisible(getExplainCallBox()) != explainCallDisplayed) {
        explainCallDisplayed = !explainCallDisplayed;
        if (explainCallDisplayed) onExplainCallDisplayed();
        else onExplainCallHidden();
    }
    if (isVisible(getDealEndPanel()) != dealEndPanelDisplayed) {
        dealEndPanelDisplayed = !dealEndPanelDisplayed;
        if (dealEndPanelDisplayed) onDealEndPanelDisplayed();
    }
    if ((myOpponent(true) != LHOpponent) || (myOpponent(false) != RHOpponent)) {
        onAnyOpponentChange();
    }
    if (getDealNumber() != lastDealNumber) {
        if (getDealNumber() != '') {
            onNewDeal();
        }
        lastDealNumber = getDealNumber();
    }
    if (callText != lastSelectedCall) {
        lastSelectedCall = callText;
        if (isVisible(getAuctionBox())) onNewCallSelected();
    }
    if (getLastChatMessaage() != lastChatMessage) {
        lastChatMessage = getLastChatMessaage();
        onNewChatMessage();
    }
    if (cardLead != getCard(90)) {
        cardLead = getCard(90);
        onNewLead();
    }
    if (playedCards != getPlayedCards()) {
        playedCards = getPlayedCards();
        onNewPlayedCard();
    }
    if (isVisible(getCallExplanationPanel()) != callExplanationPanelDisplayed) {
        callExplanationPanelDisplayed = !callExplanationPanelDisplayed;
        if (callExplanationPanelDisplayed) onCallExplanationPanelDisplayed();
    }
    if ((myCardsDisplayed != getMyHand()) && (getMyHand().length == 26)) {
        myCardsDisplayed = getMyHand();
        onMyCardsDisplayed();
    }
    onAnyMutation();
    observer.observe(targetNode, config);
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
const targetNode = document.body;
observer.observe(targetNode, config);


function onAnyMutation() {
    // move down CC table
    var ccd = document.getElementById('ccDiv');
    if (ccd != null) ccd.style.top = "";
    //	if (ccd != null) ccd.style.top = "85px";
    partnershipOptions();
    checkOptionsVulnerability();
    setOptionColors();
    if ($("#adpanel2").length == 1) {
        if (document.activeElement.tagName.toLowerCase() == "input") {
            //            document.activeElement.tagName.onfocus = inputOnFocus;
            if (!$("#rightDiv")[0].contains(document.activeElement)) {
                $("#adpanel2")[0].inputObject = document.activeElement;
                if (document.activeElement.onclick == null) {
                    document.activeElement.onclick = function () {
                        toggleButtons(this);
                    };
                }
            }
        }
    }
    hover_bboalert();
    BBOalertEvents().dispatchEvent(E_onAnyMutation);
    execUserScript('%onAnyMutation%');
}

function onBiddingBoxCreated() {
    lastDealNumber = '';
    LHOpponent = '';
    RHOpponent = '';
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onBiddingBoxCreated);
    execUserScript('%onBiddingBoxCreated%');
}

function onBiddingBoxDisplayed() {
    setBiddingButtonEvents();
    //    setExplainInputClickEvents();
    var elAlertExplain = getExplainInput();
    if (elAlertExplain.onclick == null) {
        elAlertExplain.onclick = function () {
            toggleButtons(this);
        };
    }
    lastUserExplanation = '';
    if (elAlertExplain.oninput == null) {
        elAlertExplain.oninput = function () {
            lastUserExplanation = elAlertExplain.value;
        };
    }
    elAlertExplain.onkeyup = inputOnKeyup;
    //    elAlertExplain.onfocus = inputOnFocus;
    getExplainInput().setAttribute("maxlength", "69");
    BBOalertEvents().dispatchEvent(E_onBiddingBoxDisplayed);
    execUserScript('%onBiddingBoxDisplayed%');
}

function onBiddingBoxHidden() {
    BBOalertEvents().dispatchEvent(E_onBiddingBoxHidden);
    execUserScript('%onBiddingBoxHidden%');
}

function onAuctionBoxDisplayed() {
    BBOalertEvents().dispatchEvent(E_onAuctionBoxDisplayed);
    execUserScript('%onAuctionBoxDisplayed%');
    setTimeout(function () {
        if (getContext() == '') {
            BBOalertEvents().dispatchEvent(E_onAuctionBegin);
            execUserScript('%onAuctionBegin%');
        }
    }, 200);
}

function onAuctionBoxHidden() {
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onAuctionBoxHidden);
    execUserScript('%onAuctionBoxHidden%');
    var ctx = getContext();
    if ((ctx.length >= 8) && (ctx.endsWith('------'))) {
        BBOalertEvents().dispatchEvent(E_onAuctionEnd);
        execUserScript('%onAuctionEnd%');
    }
}

function onFinalContractDisplayed() {
    BBOalertEvents().dispatchEvent(E_onFinalContractDisplayed);
    execUserScript('%onFinalContractDisplayed%');
}

function onNewAuction() {
    if (currentAuction != '')
        if (currentAuction != '??') {
            ctxArray = bidArray(stripContext(getContext()));
            BBOalertEvents().dispatchEvent(E_onNewAuction);
            execUserScript('%onNewAuction%');
        }
}

function onNewActivePlayer() {
    BBOalertEvents().dispatchEvent(E_onNewActivePlayer);
    execUserScript('%onNewActivePlayer%');
}

function onExplainCallDisplayed() {
    dragElement(getExplainCallBox());
    getExplainCallBox().onkeyup = inputOnKeyup;
    //    getExplainCallBox().onfocus = inputOnFocus;
    var e = getExplainCallInput();
    if (e.onclick == null) {
        e.onclick = function () {
            toggleButtons(this);
        };
    }
    getExplainCallBox().style.width = "auto";
    getExplainCallBox().style.height = "auto";
    dragElement(getExplainCallBox());
    BBOalertEvents().dispatchEvent(E_onExplainCallDisplayed);
    execUserScript('%onExplainCallDisplayed%');
}

function onExplainCallHidden() {
    BBOalertEvents().dispatchEvent(E_onExplainCallHidden);
    execUserScript('%onExplainCallHidden%');
}

function onBiddingBoxRemoved() {
    setBiddingButtonEvents();
    BBOalertEvents().dispatchEvent(E_onBiddingBoxRemoved);
    execUserScript('%onBiddingBoxRemoved%');
}

function onNavDivDisplayed() {
    // complete initial setup
    $(window).on("beforeunload", exportUpdateData);
    $(".logoutBlock button")[0].onclick = exportUpdateData;
    setUI();
    addBBOalertTab();
    alertData = localStorage.getItem('BBOalertCache');
    if (alertData == null) alertData = 'BBOalert\n';
    if (alertData == "") alertData = 'BBOalert\n';
    alertOriginal = alertData;
    openAccountTab();
    setOptions(true);
    bboalertLog(version + "<br>Reading data<br>");
    setTimeout(() => {
        updateAlertDataAsync(alertOriginal, function () {
            alertTable = alertData.split("\n");
            saveAlertTableToClipboard();
            processTable();
            displayHeaders();
            addBBOalertLog("<br>" + alertTable.length + " records from cache");
            var elMessage = getChatInput();
            elMessage.onkeyup = inputOnKeyup;
            if (elMessage.onclick == null) {
                elMessage.onclick = function () {
                    toggleButtons(this);
                };
            }
            setPageReload();
            setTabEvents();
            partnershipOptions();
            setTimeout(function () {
                setOptions(true);
            }, 200);
            restoreSettings();
            hideUnusedOptions();
            BBOalertEvents().dispatchEvent(E_onLogin);
            execUserScript('%onLogin%');
        });
    }, 500);
}

function onNavDivHidden() {
    setButtonPanel(false);
    setOptionsOff();
    initGlobals();
    localStorage.setItem('BBOalertCache', alertOriginal);
    BBOalertEvents().dispatchEvent(E_onLogoff);
    execUserScript('%onLogoff%');
}

function onAnyOpponentChange() {
    if (!biddingBoxExists) return;
    opponentChanged = '';
    if (myOpponent(true) != LHOpponent) {
        opponentChanged = 'L';
        LHOpponent = myOpponent(true);
    }
    if (myOpponent(false) != RHOpponent) {
        opponentChanged = opponentChanged + 'R';
        RHOpponent = myOpponent(false);
    }
    BBOalertEvents().dispatchEvent(E_onAnyOpponentChange);
    execUserScript('%onAnyOpponentChange%');
}

function onNewDeal() {
    activePlayer = '';
    BBOalertEvents().dispatchEvent(E_onNewDeal);
    execUserScript('%onNewDeal%');
}

function onNewCallSelected() {
    if (lastSelectedCall.length == 2) {
        BBOalertEvents().dispatchEvent(E_onNewCallSelected);
        execUserScript('%onNewCallSelected%');
    }
    if (lastSelectedCall.length == 1) {
        BBOalertEvents().dispatchEvent(E_onCallLevelSelected);
        execUserScript('%onCallLevelSelected%');
    }
}

function onNewLead() {
    if (myDirection() != "") {
        if (getMyHand().length == 24) {
            BBOalertEvents().dispatchEvent(E_onMyLead);
            execUserScript('%onMyLead%');
        }
    }
}

function onNewPlayedCard() {
    if (playedCards != '') {
        BBOalertEvents().dispatchEvent(E_onNewPlayedCard);
        execUserScript('%onNewPlayedCard%');
    }
}

function onCallExplanationPanelDisplayed() {
    dragElement(getCallExplanationPanel());
    BBOalertEvents().dispatchEvent(E_onCallExplanationPanelDisplayed);
    execUserScript('%onCallExplanationPanelDisplayed%');
}

function onMyCardsDisplayed() {
    lastUserExplanation = '';
    BBOalertEvents().dispatchEvent(E_onMyCardsDisplayed);
    execUserScript('%onMyCardsDisplayed%');
}


function onDealEndPanelDisplayed() {
    BBOalertEvents().dispatchEvent(E_onDealEnd);
    execUserScript('%onDealEnd%');
}

function onAnnouncementDisplayed() {
    dragElement(getAnnouncementPanel());
    BBOalertEvents().dispatchEvent(E_onAnnouncementDisplayed);
    execUserScript('%onAnnouncementDisplayed%');
}

function onNotificationDisplayed() {
    BBOalertEvents().dispatchEvent(E_onNotificationDisplayed);
    execUserScript('%onNotificationDisplayed%');
}

function onNewChatMessage() {
    BBOalertEvents().dispatchEvent(E_onNewChatMessage);
    execUserScript('%onNewChatMessage%');
}
