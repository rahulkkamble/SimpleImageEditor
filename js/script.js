// Lets begin
const fileInput = document.querySelector(".file-input"),
    filterOptions = document.querySelectorAll(".filter button"),
    filterInfoName = document.querySelector(".filter-info .name"),
    filterSlider = document.querySelector(".slider input"),
    filterValue = document.querySelector(".filter-info .value"),
    rotateOptions = document.querySelectorAll(".rotate button"),
    previewImg = document.querySelector(".preview-img img"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    chooseImg = document.querySelector(".choose-img"),
    saveImg = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;
let savedImage = true;

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
const loadImg = () => {
    const loadingImg = () => {
        let file = fileInput.files[0]; /* Users file input */
        // console.log(file)
        if (!file) return;
        previewImg.src = URL.createObjectURL(file);
        previewImg.addEventListener("load", () => {
            document.querySelector(".container").classList.remove("disable");
            resetFilters();
            filterOptions[0].click();  // by deafult brightness button will clicked...
            applyFilter();
            savedImage = false;
        })
    }
    if (savedImage) {
        loadingImg();
    } else {
        let ansConfirm = confirm("Image isn't saved properly. Do you want to continue to load new Image??")
        if(ansConfirm){
            loadingImg();
        }else return
    }
}
filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active")
        filterInfoName.innerText = option.innerText;
        if (option.id === "brightness") {
            filterSlider.max = "200"
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`
        } else if (option.id === "saturation") {
            filterSlider.max = "200"
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if (option.id === "inversion") {
            filterSlider.max = "100"
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`
        } else {
            filterSlider.max = "100"
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`
        }
    })
})

const updateSliderInfo = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active")
    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}

rotateOptions.forEach((option) => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90;
        } else if (option.id === "right") {
            rotate += 90;
        } else if (option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else if (option.id === "vertical") {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    })
})

const resetFilters = () => {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();  // by deafult brightness button will clicked...
    applyFilter();
}

const saveImage = () => {
    savedImage = true;
    const canvas = document.createElement("canvas"); // created canvas element
    const ctx = canvas.getContext("2d"); // for drawing context to canvas
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical)
    // ctx.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`  This isn't working...
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // document.body.appendChild(canvas);
    const link = document.createElement("a");
    link.download = "Edited-Image";
    link.href = canvas.toDataURL();
    link.click();
}
fileInput.addEventListener("change",loadImg);
chooseImg.addEventListener("click", () => fileInput.click());
saveImg.addEventListener("click", saveImage)
resetFilterBtn.addEventListener("click", resetFilters);
filterSlider.addEventListener("input", updateSliderInfo);


// what's New 
/* let file = fileInput.files[0];                                   --> file input from user
    if(!file) return;                                               --> if file is absent then return to page
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", ()=>{                       --> load event
    })

    const saveImage = () => {
    document.createElement("canvas");                               --> created canvas element
    ctx = canvas.getContext("2d");                                  --> for drawing context to canvas
    canvas.width = previewImg.naturalWidth;                         
    canvas.height = previewImg.naturalHeight;

    ctx.filter , ctx.translate , ctx.rotate(rotate * Math.PI / 180) --> to set filter on ctx... canvas.context
    ctx.scale(flipHorizontal, flipVertical)

    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    -->          (Image...  ,  dx              ,  dy               , width       , height       );

    const link = document.createElement("a");   --\\
    link.download = "Edited-Image";                \\__ creating download link for image(canvas);
    link.href = canvas.toDataURL();                //
    link.click();                               --//
}

*/