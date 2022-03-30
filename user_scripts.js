function initUserScripts() {
    userScripts = [];
    userScriptNames = [];
    userScriptMap = new Map();
    setUserScript("suitBid", function (SN, S, CR, C, BR, B) {
        return B.slice(-1);
    });

    setUserScript("transfer", function (SN, S, CR, C, BR, B) {
        var R = '';
        var suit = B.slice(-1);
        if (/C/.test(suit)) R = S + "D";
        if (/D/.test(suit)) R = S + "H";
        if (/H/.test(suit)) R = S + "S";
        if (/S/.test(suit)) R = "NT";
        if (/N/.test(suit)) R = S + "C";
        return R;
    });

    setUserScript("texas", function (SN, S, CR, C, BR, B) {
        var R = '';
        var suit = B.slice(-1);
        if (/C/.test(suit)) R = S + "D";
        if (/D/.test(suit)) R = S + "H";
        if (/H/.test(suit)) R = S + "S";
        if (/S/.test(suit)) R = S + "C";
        if (/N/.test(suit)) R = S + "C";
        return R;
    });

    setUserScript("remove_ads", function (SN, S, CR, C, BR, B) {
        document.getElementById("bbo_ad1").style.display = "none";
        document.getElementById("bbo_ad2").style.display = "none";
        document.getElementById("bbo_app").style.left = "0px";
        document.getElementById("bbo_app").style.width = "";
        return "";
    });

    setUserScript("test", function (SN, S, CR, C, BR, B) {
//        console.log(SN);
//        console.log(S);
//        console.log(scriptArg(S));
//        console.log(CR);
//        console.log(C);
//        console.log(BR);
//        console.log(B);
        $(getBiddingBox()).hide();
        setTimeout(() => {
            $(getBiddingBox()).show();
        }, 100);
//        return B.slice(-1);
    });

    relativeBidMap = [["","",""]];
    setUserScript("relative_bid", function (SN, S, CR, C, BR, B) {
        var S1 = S;
        if (S1 == "raise") S1 = "2,0,5";
        if (S1 == "jump_raise") S1 = "2,0,10";
        if (S1 == "raise") S1 = "2,0,5";
        if (S1 == "jump_raise") S1 = "2,0,10";
        if (S1 == "cuebid_rho") S1 = "3,0,5";
        if (S1 == "cuebid_lho") S1 = "1,0,5";
        console.log("SN   = ", SN);
        console.log("S    = ", S);
        console.log("S1   = ", S1);
        console.log("CR   = ", CR);
        console.log("C    = ", C);
        console.log("BR   = ", BR);
        console.log("B    = ", B);
        var args = S1.split(",");
        var who = 0;
        var idx = 0;
        var offset = 0;
        if (args.length >= 1) who = parseInt(args[0]);
        if (args.length >= 2) idx = parseInt(args[1]);
        if (args.length >= 3) offset = parseInt(args[2]);
        for (let i = 0; i < relativeBidMap.length; i++) {
            if (C.startsWith(relativeBidMap[i][0]))
            if (SN == relativeBidMap[i][1]) return relativeBidMap[i][2];
        }
        var ret =  getBidFromContext(who, idx, offset);
        relativeBidMap.push([C,SN,ret]);
        return ret;
    });

    setUserScript("redisplay_biddingbox", function (SN, S, CR, C, BR, B) {
        $(getBiddingBox()).hide();
        setTimeout(() => {
            $(getBiddingBox()).show();
        }, 100);
    });
}