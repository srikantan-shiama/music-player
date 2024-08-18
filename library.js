const serverUrl = "https://tlm7luqyy4k3.usemoralis.com:2053/server";
const appId = "kSv42gBDNoTpmmzDkKDrv5OIVA5eiWxwCId1vz8m";
Moralis.start({ serverUrl, appId });

async function getObj(){
    console.log("getObj");
    const options_rop = { chain: 'ropsten', address: localStorage.metamaskAccount};
    const ropNFTs = await Moralis.Web3API.account.getNFTs(options_rop);
    console.log("ropNFTs");
    return ropNFTs
}

async function addSong(nft) { 
    console.log("addSong");
    if (!nft.token_uri) { 
        return;
    }
    let ipfs = nft.token_uri;
    obj = await (await fetch(ipfs)).json();
    
    console.log(obj);
    var ul = document.querySelector(".songlist");
    var li = document.createElement("li");
    var audio = document.createElement("audio");
    var image = document.createElement("img");
    var name = document.createElement("span");

    if (obj.audio) { 
        let audioLink = obj.audio;
        audio.src = audioLink;
        li.appendChild(audio);
    }
    else if (obj.animation_url) { 
        let audioLink = obj.animation_url;
        audio.src = audioLink;
        li.appendChild(audio);
    
    } else { 
        return;
    }


    let imageLink = obj.image;
    image.src = imageLink;
    li.appendChild(image);

    name.innerHTML = obj.name;
    li.appendChild(name);
    li.setAttribute("data-name", obj.name);

    console.log(li);
    
    ul.appendChild(li);
    console.log(ul);
}

async function fetchNFTs(){
    console.log("fetchNFT");
    let NFTObj = await getObj();
    const NFTList = NFTObj.result;
    console.log(NFTList);
    for (let i = 0; i < NFTList.length; i++) {
        let nft = NFTList[i]
        await addSong(nft);
      }
}

async function loadLibrary() {
    console.log("loadLibrary");
    if (!localStorage.metamaskAccount) { 
        alert("Connect MetaMask to load NFTs!");
    } 
    else { 
        fetchNFTs();
    }
}
