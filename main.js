function main() {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        console.log("mobile");
    } else {
        console.log("not mobile");
    }
}
main();
