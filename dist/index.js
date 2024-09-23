"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    const logoUrl = "https://cdn.prod.website-files.com/66aadbd497db3d8c63799460/66eb5ac454e950633d646ea2_testlogo.jpg";
    let productsData = {};
    const calhaColors = {
      Branco: "B",
      Inox: "I",
      Bronze: "BZ",
      Preto: "P",
      Nogueira: "N",
      Chumbo: "CH"
    };
    const productSizes = {
      estores: {
        width: [
          80,
          90,
          100,
          110,
          120,
          130,
          140,
          150,
          160,
          170,
          180,
          190,
          200,
          210,
          220,
          230,
          240,
          250,
          260,
          270,
          280,
          290,
          300
        ],
        height: [80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320]
      },
      calhas: {
        "5000-B": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "5000-I": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "5000-BZ": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "5000-P": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "5000-N": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "5000-CH": [120, 140, 160, 180, 200, 220, 240, 260, 300, 350, 400, 450, 500],
        "1500-B": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "1500-I": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "1500-BZ": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "1500-P": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "1500-N": [120, 140, 160, 180, 200, 220, 240, 260, 300, 320, 340, 360, 400, 440, 500, 600],
        "1500-CH": [120, 140, 160, 180, 200, 220, 240, 260, 300, 350, 400, 450, 500],
        "9500M": [
          150,
          200,
          250,
          300,
          350,
          400,
          450,
          500,
          600,
          650,
          700,
          750,
          800,
          850,
          900,
          1e3,
          1200
        ],
        KS: [160, 200, 240, 300, 400, 500, 600],
        "DSXL-B": [160, 200, 240, 300, 400, 600],
        "DSXL-CZ": [160, 200, 240, 300, 400, 600],
        "DSXL-P": [160, 200, 240, 300, 400, 600]
      }
    };
    const selectedColors = [];
    const windows = [];
    let currentStep = "inicio";
    const selectorValues = {
      inicio: "",
      tecido: "",
      tipo: "",
      bainha: "",
      medidas: "",
      correcao: "",
      calha: "",
      suporte: "",
      instalacao: "",
      nome: "",
      email: "",
      contacto: ""
    };
    const MANUFACTURING_CONSTANTS = {
      usedWidths: [
        { name: "Franzido", widthRatio: 2.5 },
        { name: "Ondas", widthRatio: 2.7 },
        { name: "Macho Juntos", widthRatio: 3 },
        { name: "Pregas", widthRatio: 2.5 }
      ],
      manufacturingPrices: [
        {
          name: "Franzido",
          blackout: 9,
          normal: 8
        },
        {
          name: "Ondas",
          blackout: 8.5,
          normal: 7.5
        },
        {
          name: "Macho Juntos",
          normal: 13.5,
          blackout: 13.5,
          alinhado: 12.5
        },
        {
          name: "Pregas",
          normal: 13.5,
          blackout: 13.5,
          alinhado: 12.5
        }
      ],
      bainhaPrice: {
        price: 3.5,
        widthMargin: 20
      },
      uniao: {
        maxLength: 400,
        price: 8.6,
        calha9500M: 15
      },
      prolongadores: 3.7,
      roletesPrice: 5,
      minWindowWidthEstores: 80,
      maxWindowWidthEstores: 300,
      minWindowHeightEstores: 80,
      maxWindowHeightEstores: 300,
      maxWindowWidth: 650,
      maxWindowHeight: 280,
      maxCalhaWidth: 600,
      measuresCheckPrice: 30,
      instalation: [
        { maxWidth: 300, price: 35 },
        { maxWidth: 400, price: 40 },
        { maxWidth: 500, price: 45 },
        { maxWidth: 600, price: 50 },
        { maxWidth: 650, price: 55 }
      ]
    };
    let isNewWindow = true;
    const simContainer = document.getElementById("sim-container");
    const cortinaSteps = document.getElementById("steps-cortina");
    const estoreSteps = document.getElementById("steps-estore");
    const simulatorHeadings = {
      step1: document.getElementById("simulator-heading-1"),
      step1i: document.getElementById("inicio-description"),
      step1c: document.getElementById("inicio-description-c"),
      step1e: document.getElementById("inicio-description-e"),
      step2: document.getElementById("simulator-heading-2"),
      step3: document.getElementById("simulator-heading-3"),
      step4: document.getElementById("simulator-heading-4"),
      step5: document.getElementById("simulator-heading-5")
    };
    const selectors = {
      inicio: document.getElementById("inicio-selector"),
      tecido: document.getElementById("tecido-selector"),
      tipo: document.getElementById("tipo-selector"),
      bainha: document.getElementById("bainha-selector"),
      medidas: document.getElementById("medidas-selector"),
      correcao: document.getElementById("correcao-selector"),
      suporte: document.getElementById("suporte-selector"),
      instalacao: document.getElementById("instalacao-selector")
    };
    const larguraInputDescrC = document.getElementById("largura-input-descr-c");
    const alturaInputDescrC = document.getElementById("altura-input-descr-c");
    const larguraInputDescrE = document.getElementById("largura-input-descr-e");
    const alturaInputDescrE = document.getElementById("altura-input-descr-e");
    const larguraInput = document.getElementById("largura-input");
    const alturaInput = document.getElementById("altura-input");
    const correcaoInput = document.querySelector("#correcao-switch");
    const bainhaInput = document.querySelector("#bainha");
    const tectoRadioBtn = document.getElementById("tecto-radio-btn");
    const paredeRadioBtn = document.getElementById("parede-radio-btn");
    const instalacaoInput = document.querySelector("#instalacao-switch");
    const larguraMinErrorEstore = document.getElementById("largura-min-error-estore");
    const alturaMinErrorEstore = document.getElementById("altura-min-error-estore");
    const larguraMaxErrorEstore = document.getElementById("largura-max-error-estore");
    const alturaMaxErrorEstore = document.getElementById("altura-max-error-estore");
    const larguraMaxErrorCortina = document.getElementById("largura-error");
    const alturaMaxErrorCortina = document.getElementById("altura-error");
    const nextButton = document.getElementById("seguinte-btn");
    const steps = {
      tecido: document.getElementById("step-tecido"),
      tipo: document.getElementById("step-tipo"),
      medidas: document.getElementById("step-medidas"),
      calha: document.getElementById("step-calha"),
      instalacao: document.getElementById("step-instalacao"),
      medidasEstore: document.getElementById("step-medidas-estore"),
      instalacaoEstore: document.getElementById("step-instalacao-estore")
    };
    const userDetailsForm = document.getElementById("form");
    const nomeInput = document.getElementById("nome-input");
    const emailInput = document.getElementById("email-input");
    const contactoSwitch = document.getElementById("contacto-switch");
    const checkoutContain = document.getElementById("checkout-container");
    const newWindowContain = document.getElementById("new-window-contain");
    const checkoutFormContain = document.getElementById("checkout-input-contain");
    const checkoutInfoEstore = document.getElementById("checkout-info-estore");
    const checkoutInfoCortina = document.getElementById("checkout-info-cortina");
    const newWindowButton = document.getElementById("new-window-btn");
    const noWindowButton = document.getElementById("no-window-btn");
    const enviarButton = document.getElementById("enviar-btn");
    const checkoutChoices = {
      tecido: document.getElementById("checkout-tecido"),
      tipo: document.getElementById("checkout-tipo"),
      bainha: document.getElementById("checkout-bainha"),
      largura: document.getElementById("checkout-largura"),
      altura: document.getElementById("checkout-altura"),
      correcao: document.getElementById("checkout-correcao"),
      calha: document.getElementById("checkout-calha"),
      suporte: document.getElementById("checkout-suporte"),
      instalacao: document.getElementById("checkout-instalacao"),
      estoreProduto: document.getElementById("checkout-produto-estore"),
      estoreLargura: document.getElementById("checkout-largura-estore"),
      estoreAltura: document.getElementById("checkout-altura-estore"),
      estoreCorrecao: document.getElementById("checkout-correcao-estore"),
      estoreInstalacao: document.getElementById("checkout-instalacao-estore")
    };
    const feedbackMessage = document.getElementById("feedback-div");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const checkFieldError = document.getElementById("contacto-switch-error");
    const cortinaRadioBtn = document.getElementById("cortina-radio-btn");
    const estoreRadioBtn = document.getElementById("estore-radio-btn");
    const calhaRadioBtn = document.getElementById("calha-radio-btn");
    const initializeEventListeners = () => {
      addOnClickNextButton();
      addOnClickToInicioCards();
      addOnClickToTecidoCards();
      addOnClickToTipoCards();
      addOnClickBainha();
      addOnClickCorrecao();
      addOnClickInstalacao();
      addOnClickColor();
      addOnClickEnviar();
      addOnClickNewWindow();
      addOnClickNoWindow();
      addOnClickCheckoutChoices();
      addOnClickStep();
      addOnChangeMedidasInputs();
      addOnChangeSuporteRadioBtns();
    };
    const onInit = () => {
      fetchProducts();
      initializeEventListeners();
    };
    const getProductPrice = (window2) => {
      let productPrice = 0, calhaPrice = 0, reference = "";
      const productDetails = window2.tecido.split("-");
      const product = productDetails[0];
      const color = productDetails[1];
      const calhaDetails = window2.calha ? window2.calha.split("-") : null;
      const calha = calhaDetails ? calhaDetails[0] : null;
      const calhaColor = calhaDetails ? calhaDetails[1] : null;
      const width = window2.medidas ? window2.medidas.split(" X ")[0] : 0;
      if (window2.inicio === "Cortina") {
        reference = `${product}${color}`;
      }
      if (window2.inicio === "Estore") {
        const height = window2.medidas ? window2.medidas.split(" X ")[1] : 0;
        reference = getVariableEstoreReference(product, color, width, height);
      }
      productPrice = typeof productsData[reference].price === "string" ? parseFloat(productsData[reference].price) : productsData[reference].price;
      if (window2.inicio === "Estore") {
        return { product: productPrice, calha: 0 };
      }
      const calhaMultiplier = (width / MANUFACTURING_CONSTANTS.maxCalhaWidth | 0) + 1;
      const calhaWidth = width <= MANUFACTURING_CONSTANTS.maxCalhaWidth ? width : width / calhaMultiplier;
      const calhaReference = getVariableCalhaReference(
        calha,
        window2.tipo,
        calhaColor,
        calhaWidth,
        window2?.suporte === "Parede" ? true : false
      );
      calhaPrice = !productsData[calhaReference] ? 0 : width < MANUFACTURING_CONSTANTS.maxCalhaWidth ? productsData[calhaReference].price : productsData[calhaReference].price * calhaMultiplier;
      calhaPrice += width > MANUFACTURING_CONSTANTS.maxCalhaWidth ? MANUFACTURING_CONSTANTS.prolongadores * calhaMultiplier : width > MANUFACTURING_CONSTANTS.uniao.maxLength && window2.calha.startsWith("9500M") ? MANUFACTURING_CONSTANTS.uniao.calha9500M * calhaMultiplier : width > MANUFACTURING_CONSTANTS.uniao.maxLength ? MANUFACTURING_CONSTANTS.uniao.price * calhaMultiplier : 0;
      (calhaReference.startsWith("5000") || calhaReference.startsWith("1500")) && (calhaPrice += width < MANUFACTURING_CONSTANTS.maxCalhaWidth ? MANUFACTURING_CONSTANTS.roletesPrice : MANUFACTURING_CONSTANTS.roletesPrice * calhaMultiplier);
      return { product: productPrice, calha: calhaPrice };
    };
    const fetchProducts = () => {
      fetch(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSCprbghTI2dhOxsCMkcEHhI-DE5pOb5RnOKO3KPd5-ntAORtuPTuFonSvs9s4-ANy_VCezuEdcZ8pg/pub?gid=0&single=true&output=csv"
        // 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSCprbghTI2dhOxsCMkcEHhI-DE5pOb5RnOKO3KPd5-ntAORtuPTuFonSvs9s4-ANy_VCezuEdcZ8pg/export?format=csv&gid=0&single=true'
        // `https://docs.google.com/spreadsheets/d/1hkgiYOVj33yY6b--bJaNPZOvHFvQ4klM402z0xp-gjE/export?format=csv&gid=0&single=true`
      ).then((response) => response.text()).then((csvData) => {
        const lines = csvData.trim().split("\n");
        const headers = lines[0].split(",");
        const data = lines.slice(1).map((line) => line.split(","));
        const jsonData = {};
        data.forEach((row) => {
          const [id, price] = row;
          if (!jsonData[id]) {
            jsonData[id] = { id, price: parseFloat(price) };
          }
        });
        productsData = jsonData;
      }).catch((error) => console.error("Error fetching CSV data:", error));
    };
    const updateSelectorValue = (selector, value) => {
      selectorValues[selector.id.split("-")[0]] = value;
    };
    const updateCalhaValue = (value) => {
      selectorValues.calha = value;
    };
    const updateSuporteValue = (value) => {
      selectorValues.suporte = paredeRadioBtn.checked ? "Parede" : "Tecto";
    };
    const resetValues = () => {
      selectorValues.inicio = "";
      selectorValues.tecido = "";
      selectorValues.tipo = "";
      selectorValues.bainha = "";
      selectorValues.medidas = "";
      selectorValues.correcao = "";
      selectorValues.calha = "";
      selectorValues.suporte = "";
      selectorValues.instalacao = "";
    };
    const populateSelectorValues = (window2) => {
      if (window2.inicio === "Cortina") {
        updateSelectorValue(selectors.inicio, "Cortina");
        updateSelectorValue(selectors.tecido, window2.tecido);
        updateSelectorValue(selectors.tipo, window2.tipo);
        updateSelectorValue(selectors.bainha, window2.bainha);
        updateSelectorValue(selectors.medidas, window2.medidas);
        updateSelectorValue(selectors.correcao, window2.correcao);
        updateSelectorValue(selectors.suporte, window2.suporte);
        updateSelectorValue(selectors.instalacao, window2.instalacao);
      }
      if (window2.inicio === "Estore") {
        updateSelectorValue(selectors.inicio, "Estore");
        updateSelectorValue(selectors.tecido, window2.tecido);
        updateSelectorValue(selectors.medidas, window2.medidas);
        updateSelectorValue(selectors.correcao, window2.correcao);
        updateSelectorValue(selectors.instalacao, window2.instalacao);
      }
    };
    const storeValues = () => {
      const newWindow = {
        inicio: selectorValues.inicio,
        bainha: selectorValues.bainha,
        tecido: selectorValues.tecido,
        tipo: selectorValues.tipo,
        medidas: selectorValues.medidas,
        correcao: selectorValues.correcao,
        calha: selectorValues.calha,
        suporte: selectorValues.suporte,
        instalacao: selectorValues.instalacao
      };
      windows.push(newWindow);
      isNewWindow = false;
    };
    const createWindow = () => {
      updateProductsCMSFilter("Cortina");
      resetValues();
      resetInputs();
      resetSteps();
      navigateFromCheckoutToStep("inicio");
      isNewWindow = true;
    };
    const validateSelector = () => {
      switch (currentStep) {
        case "inicio":
          if (selectorValues.inicio === "") {
            activateNextBtn(false);
            return false;
          }
          activateNextBtn(true);
          return true;
        case "tecido":
          if (selectorValues.tecido === "") {
            activateNextBtn(false);
            return false;
          }
          activateNextBtn(true);
          return true;
        case "tipo":
          if (selectorValues.tipo === "") {
            activateNextBtn(false);
            return false;
          }
          activateNextBtn(true);
          return true;
        case "medidas":
          if (larguraInput?.value === "" || alturaInput?.value === "") {
            activateNextBtn(false);
            return false;
          }
          if (selectorValues.inicio === "Cortina") {
            if (parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidth || parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeight) {
              parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidth ? larguraMaxErrorCortina.style.display = "block" : larguraMaxErrorCortina.style.display = "none";
              parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeight ? alturaMaxErrorCortina.style.display = "block" : alturaMaxErrorCortina.style.display = "none";
              activateNextBtn(false);
              return false;
            }
            activateNextBtn(true);
            return true;
          }
          if (selectorValues.inicio === "Estore") {
            if (parseInt(larguraInput?.value) < MANUFACTURING_CONSTANTS.minWindowWidthEstores || parseInt(alturaInput?.value) < MANUFACTURING_CONSTANTS.minWindowHeightEstores) {
              parseInt(larguraInput?.value) < MANUFACTURING_CONSTANTS.minWindowWidthEstores ? larguraMinErrorEstore.style.display = "block" : larguraMinErrorEstore.style.display = "none";
              parseInt(alturaInput?.value) < MANUFACTURING_CONSTANTS.minWindowHeightEstores ? alturaMinErrorEstore.style.display = "block" : alturaMinErrorEstore.style.display = "none";
              activateNextBtn(false);
              return false;
            }
            if (parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidthEstores || parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeightEstores) {
              parseInt(larguraInput?.value) > MANUFACTURING_CONSTANTS.maxWindowWidthEstores ? larguraMaxErrorEstore.style.display = "block" : larguraMaxErrorEstore.style.display = "none";
              parseInt(alturaInput?.value) > MANUFACTURING_CONSTANTS.maxWindowHeightEstores ? alturaMaxErrorEstore.style.display = "block" : alturaMaxErrorEstore.style.display = "none";
              activateNextBtn(false);
              return false;
            }
            activateNextBtn(true);
            return true;
          }
          larguraMaxErrorCortina.style.display = "none";
          alturaMaxErrorCortina.style.display = "none";
          larguraMinErrorEstore.style.display = "none";
          alturaMinErrorEstore.style.display = "none";
          larguraMaxErrorEstore.style.display = "none";
          alturaMaxErrorEstore.style.display = "none";
          activateNextBtn(true);
          return true;
        case "calha":
          if (selectorValues.calha === "") {
            activateNextBtn(false);
            return false;
          }
          activateNextBtn(true);
          return true;
        case "suporte":
          if (selectorValues.suporte === "") {
            activateNextBtn(false);
            return false;
          }
          activateNextBtn(true);
          return true;
      }
      activateNextBtn(true);
      return true;
    };
    const getVariableEstoreReference = (product, color, width, height) => {
      const closestWidth = productSizes.estores.width.find((w) => w >= width);
      const closestHeight = productSizes.estores.height.find((h) => h >= height);
      return `${product}${closestHeight}${closestWidth}`;
    };
    const getVariableCalhaReference = (product, type, color, width, isWallMounted) => {
      if (product === "KS") {
        if (isWallMounted) {
          const closestWidth3 = productSizes.calhas[product]?.find((w) => w >= width);
          return `${product}${type === "Franzido" ? "F" : "O"}${closestWidth3}SP`;
        }
        const closestWidth2 = productSizes.calhas[product]?.find((w) => w >= width);
        return `${product}${type === "Franzido" ? "F" : "O"}${closestWidth2}`;
      }
      if (product === "DSXL") {
        if (isWallMounted) {
          const closestWidth3 = productSizes.calhas[`${product}-${color}`]?.find((w) => w >= width);
          return `${product}${type === "Franzido" ? "F" : "O"}${closestWidth3}${color}SP`;
        }
        const closestWidth2 = productSizes.calhas[`${product}-${color}`]?.find((w) => w >= width);
        return `${product}${type === "Franzido" ? "F" : "O"}${closestWidth2}${color}`;
      }
      if (product === "9500M") {
        if (isWallMounted) {
          const closestWidth3 = productSizes.calhas[product].find((w) => w >= width);
          return `${product}${closestWidth3}SP`;
        }
        const closestWidth2 = productSizes.calhas[product].find((w) => w >= width);
        return `${product}${closestWidth2}`;
      }
      if (isWallMounted) {
        const closestWidth2 = productSizes.calhas[`${product}-${color}`].find((w) => w >= width);
        return `${product}${closestWidth2}${color}SP`;
      }
      const closestWidth = productSizes.calhas[`${product}-${color}`].find((w) => w >= width);
      return `${product}${closestWidth}${color}`;
    };
    const getColorFromCard = (card) => {
      const colorText = card.getElementsByClassName("color_name");
      return colorText.length > 0 ? colorText[0].textContent : null;
    };
    const getProductFromCard = (card) => {
      const productText = card.getElementsByClassName("product_name");
      return productText.length > 0 ? productText[0].textContent : null;
    };
    const convertStepInStepNumber = (step) => {
      switch (step) {
        case "tecido":
        case "inicio":
          return "step1";
        case "tipo":
        case "bainha":
          return "step2";
        case "medidas":
        case "correcao":
          return "step3";
        case "calha":
          return "step4";
        case "instalacao":
          return "step5";
      }
    };
    const updateProductsCMSFilter = (productType) => {
      if (productType === "Estore") {
        estoreRadioBtn?.click();
      }
      if (productType === "Cortina") {
        cortinaRadioBtn?.click();
      }
      if (productType === "Calha") {
        calhaRadioBtn?.click();
      }
    };
    const resetInputs = () => {
      const inicioCards = document.querySelectorAll("[id^='inicio-card']");
      const tipoCards = document.querySelectorAll("[id^='tipo-card']");
      const productCards = document.querySelectorAll("[id^='tecido-card']");
      const productColors = document.querySelectorAll(".tecido_color");
      inicioCards.forEach((card) => {
        deactivateCard(card);
      });
      tipoCards.forEach((card) => {
        deactivateCard(card);
      });
      productCards.forEach((card) => {
        deactivateCard(card);
      });
      productColors.forEach((color) => {
        deactivateColor(color);
      });
      larguraInput.value = "";
      alturaInput.value = "";
      correcaoInput.checked = false;
      instalacaoInput.checked = false;
      paredeRadioBtn?.click();
      bainhaInput.checked = false;
    };
    const selectInicio = (value) => {
      const inicioCards = document.querySelectorAll("[id^='inicio-card']");
      inicioCards.forEach((card) => {
        if (card.getElementsByTagName("h1")[0].textContent === value) {
          activateCard(card);
        } else {
          deactivateCard(card);
        }
      });
    };
    const selectProduct = (value) => {
      const productCards = document.querySelectorAll("[id^='tecido-card']");
      productCards.forEach((card) => {
        if (getProductFromCard(card).startsWith(value)) {
          activateCard(card);
        } else {
          deactivateCard(card);
        }
      });
    };
    const selectTipo = (value) => {
      const tipoCards = document.querySelectorAll("[id^='tipo-card']");
      tipoCards.forEach((card) => {
        if (card.getElementsByTagName("h1")[0].textContent === value) {
          activateCard(card);
        } else {
          deactivateCard(card);
        }
      });
    };
    const selectSuporte = (value) => {
      if (value === "Parede") {
        paredeRadioBtn.click();
      } else {
        tectoRadioBtn.click();
      }
    };
    const clearSuporteRadioBtns = () => {
      tectoRadioBtn.checked = false;
      paredeRadioBtn.checked = false;
    };
    const createWindowBtnCheckout = () => {
      const windowBtn = document.querySelector("#checkout-window-btn");
      const windowbtnsContainer = document.getElementById("window-btns-container");
      if (windows.length === 1) {
        windows[0].button = windowBtn;
        addOnClickToWindowBtn(windows[0]);
      }
      if (windows.length > 1) {
        if (windowBtn) {
          const clonedBtn = windowBtn.cloneNode(true);
          clonedBtn.querySelector(".checkout_info_title").textContent = `Janela ${windows.length}`;
          windows[windows.length - 1].button = clonedBtn;
          addOnClickToWindowBtn(windows[windows.length - 1]);
          windowbtnsContainer?.appendChild(clonedBtn);
        }
      }
    };
    const populateInputValues = (window2) => {
      if (window2.inicio === "Cortina") {
        selectInicio(window2.inicio);
        selectProduct(window2.tecido);
        selectTipo(window2.tipo);
        bainhaInput.checked = window2.bainha;
        larguraInput.value = window2.medidas.split(" X ")[0];
        alturaInput.value = window2.medidas.split(" X ")[1];
        correcaoInput.checked = window2.correcao;
        selectSuporte(window2.suporte);
        instalacaoInput.checked = window2.instalacao;
      }
      if (window2.inicio === "Estore") {
        selectInicio(window2.inicio);
        selectProduct(window2.tecido);
        larguraInput.value = window2.medidas.split(" X ")[0];
        alturaInput.value = window2.medidas.split(" X ")[1];
        correcaoInput.checked = window2.correcao;
        instalacaoInput.checked = window2.instalacao;
      }
    };
    const updateHeadingSubtitles = (step) => {
      if (step === "inicio") {
        simulatorHeadings.step1i.style.display = "flex";
        simulatorHeadings.step1c.style.display = "none";
        simulatorHeadings.step1e.style.display = "none";
      }
      if (step === "tecido" && selectorValues.inicio === "Cortina") {
        simulatorHeadings.step1i.style.display = "none";
        simulatorHeadings.step1c.style.display = "flex";
        simulatorHeadings.step1e.style.display = "none";
      }
      if (step === "tecido" && selectorValues.inicio === "Estore") {
        simulatorHeadings.step1i.style.display = "none";
        simulatorHeadings.step1c.style.display = "none";
        simulatorHeadings.step1e.style.display = "flex";
      }
    };
    const navigateToStep = (step) => {
      if (step === "largura" || step === "altura") {
        step = "medidas";
      }
      if (step === currentStep) {
        return;
      }
      let isEstore = false;
      if (step === "estoreLargura" || step === "estoreAltura" || step === "estoreCorrecao" || step === "estoreInstalacao" || step === "estoreProduto" || step === "medidasEstore") {
        isEstore = true;
      }
      if (step === "largura" || step === "altura" || step === "estoreLargura" || step === "estoreAltura" || step === "medidasEstore") {
        step = "medidas";
      }
      if (step === "estoreCorrecao") {
        step = "correcao";
      }
      if (step === "estoreInstalacao") {
        step = "instalacao";
      }
      if (step === "estoreProduto") {
        step = "tecido";
      }
      if (steps[step].classList.contains("done")) {
        markStepAsNext(currentStep);
        changeSelectorVisibility(simulatorHeadings[convertStepInStepNumber(currentStep)], false);
        if (currentStep === "calha") {
          changeSelectorVisibility(selectors.tecido, false);
        } else {
          changeSelectorVisibility(selectors[currentStep], false);
        }
        updateHeadingSubtitles(step);
        switch (step) {
          case "tecido":
            isEstore ? updateProductsCMSFilter("Estore") : updateProductsCMSFilter("Cortina");
            changeSelectorVisibility(simulatorHeadings.step1, true);
            changeSelectorVisibility(selectors.tecido, true);
            break;
          case "tipo":
            changeSelectorVisibility(simulatorHeadings.step2, true);
            changeSelectorVisibility(selectors.tipo, true);
            break;
          case "medidas":
            changeSelectorVisibility(simulatorHeadings.step3, true);
            changeSelectorVisibility(selectors.medidas, true);
            break;
          case "calha":
            updateProductsCMSFilter("calha");
            changeSelectorVisibility(simulatorHeadings.step4, true);
            changeSelectorVisibility(selectors.tecido, true);
            break;
          case "instalacao":
            changeSelectorVisibility(simulatorHeadings.step5, true);
            changeSelectorVisibility(selectors.instalacao, true);
            break;
        }
        currentStep = step;
        validateSelector();
        markStepAsActive(step);
      }
    };
    const updateMedidasDescriptions = () => {
      if (selectorValues.inicio === "Cortina") {
        larguraInputDescrC.style.display = "block";
        alturaInputDescrC.style.display = "block";
        larguraInputDescrE.style.display = "none";
        alturaInputDescrE.style.display = "none";
      }
      if (selectorValues.inicio === "Estore") {
        larguraInputDescrC.style.display = "none";
        alturaInputDescrC.style.display = "none";
        larguraInputDescrE.style.display = "block";
        alturaInputDescrE.style.display = "block";
      }
    };
    const advanceStep = () => {
      if (selectorValues.inicio === "Cortina") {
        switch (currentStep) {
          case "inicio":
            if (validateSelector()) {
              toggleSteps("Cortina");
              changeSelectorVisibility(selectors.inicio, false);
              updateHeadingSubtitles("tecido");
              if (isNewWindow)
                activateNextBtn(false);
              changeSelectorVisibility(selectors.tecido, true);
              currentStep = "tecido";
            }
            break;
          case "tecido":
            if (validateSelector()) {
              updateHeadingSubtitles("tecido");
              markStepAsCompleted("tecido");
              markStepAsActive("tipo");
              changeSelectorVisibility(simulatorHeadings.step1, false);
              if (isNewWindow)
                activateNextBtn(false);
              changeSelectorVisibility(selectors.tecido, false);
              changeSelectorVisibility(simulatorHeadings.step2, true);
              changeSelectorVisibility(selectors.tipo, true);
              updateMedidasDescriptions();
              currentStep = "tipo";
            }
            break;
          case "tipo":
            if (validateSelector()) {
              changeSelectorVisibility(selectors.tipo, false);
              if (selectorValues.tecido.startsWith("120") || selectorValues.tecido.startsWith("122")) {
                updateSelectorValue(selectors.bainha, true);
                if (isNewWindow)
                  activateNextBtn(false);
                markStepAsCompleted("tipo");
                markStepAsActive("medidas");
                changeSelectorVisibility(simulatorHeadings.step2, false);
                changeSelectorVisibility(simulatorHeadings.step3, true);
                changeSelectorVisibility(selectors.medidas, true);
                currentStep = "medidas";
              } else {
                changeSelectorVisibility(selectors.bainha, true);
                currentStep = "bainha";
              }
            }
            break;
          case "bainha":
            updateSelectorValue(
              selectors.bainha,
              `${selectorValues.tecido.startsWith("120") || selectorValues.tecido.startsWith("122") ? true : selectorValues.bainha ? selectorValues.bainha : false}`
            );
            markStepAsCompleted("tipo");
            markStepAsActive("medidas");
            changeSelectorVisibility(simulatorHeadings.step2, false);
            changeSelectorVisibility(selectors.bainha, false);
            if (isNewWindow)
              activateNextBtn(false);
            changeSelectorVisibility(simulatorHeadings.step3, true);
            changeSelectorVisibility(selectors.medidas, true);
            currentStep = "medidas";
            break;
          case "medidas":
            if (validateSelector()) {
              updateSelectorValue(
                selectors.medidas,
                `${larguraInput?.value} X ${alturaInput?.value}`
              );
              changeSelectorVisibility(selectors.medidas, false);
              if (windows.length > 0) {
                if (isNewWindow)
                  activateNextBtn(false);
                updateProductsCMSFilter("Calha");
                markStepAsCompleted("medidas");
                markStepAsActive("calha");
                changeSelectorVisibility(simulatorHeadings.step3, false);
                changeSelectorVisibility(simulatorHeadings.step4, true);
                changeSelectorVisibility(selectors.tecido, true);
                currentStep = "calha";
              } else {
                changeSelectorVisibility(selectors.correcao, true);
                currentStep = "correcao";
              }
            }
            break;
          case "correcao":
            updateProductsCMSFilter("Calha");
            markStepAsCompleted("medidas");
            markStepAsActive("calha");
            changeSelectorVisibility(simulatorHeadings.step3, false);
            changeSelectorVisibility(selectors.correcao, false);
            if (isNewWindow)
              activateNextBtn(false);
            changeSelectorVisibility(simulatorHeadings.step4, true);
            changeSelectorVisibility(selectors.tecido, true);
            currentStep = "calha";
            break;
          case "calha":
            if (validateSelector()) {
              changeSelectorVisibility(selectors.tecido, false);
              if (isNewWindow)
                activateNextBtn(false);
              clearSuporteRadioBtns();
              changeSelectorVisibility(selectors.suporte, true);
              currentStep = "suporte";
            }
            break;
          case "suporte":
            updateSelectorValue(selectors.suporte, paredeRadioBtn?.checked ? "Parede" : "Tecto");
            if (validateSelector()) {
              markStepAsCompleted("calha");
              markStepAsActive("instalacao");
              changeSelectorVisibility(simulatorHeadings.step4, false);
              changeSelectorVisibility(selectors.suporte, false);
              if (windows.length > 0) {
                if (isNewWindow) {
                  storeValues();
                  createWindowBtnCheckout();
                }
                navigateToCheckout();
              } else {
                changeSelectorVisibility(simulatorHeadings.step5, true);
                changeSelectorVisibility(selectors.instalacao, true);
                currentStep = "instalacao";
              }
            }
            break;
          case "instalacao":
            markStepAsCompleted("instalacao");
            changeSelectorVisibility(simulatorHeadings.step5, false);
            changeSelectorVisibility(selectors.instalacao, false);
            if (isNewWindow) {
              storeValues();
              createWindowBtnCheckout();
            }
            navigateToCheckout();
            break;
        }
      } else {
        switch (currentStep) {
          case "inicio":
            if (validateSelector()) {
              toggleSteps("Estore");
              changeSelectorVisibility(selectors.inicio, false);
              updateHeadingSubtitles("tecido");
              if (isNewWindow)
                activateNextBtn(false);
              changeSelectorVisibility(selectors.tecido, true);
              currentStep = "tecido";
            }
            break;
          case "tecido":
            if (validateSelector()) {
              markStepAsCompleted("tecido");
              markStepAsActive("medidas");
              changeSelectorVisibility(simulatorHeadings.step1, false);
              changeSelectorVisibility(selectors.tecido, false);
              updateMedidasDescriptions();
              if (isNewWindow)
                activateNextBtn(false);
              changeSelectorVisibility(simulatorHeadings.step3, true);
              changeSelectorVisibility(selectors.medidas, true);
              currentStep = "medidas";
            }
            break;
          case "medidas":
            if (validateSelector()) {
              changeSelectorVisibility(selectors.medidas, false);
              if (windows.length > 0) {
                markStepAsCompleted("medidas");
                markStepAsActive("instalacao");
                changeSelectorVisibility(simulatorHeadings.step3, false);
                changeSelectorVisibility(simulatorHeadings.step5, true);
                changeSelectorVisibility(selectors.instalacao, true);
                currentStep = "instalacao";
              } else {
                changeSelectorVisibility(selectors.correcao, true);
                currentStep = "correcao";
              }
            }
            break;
          case "correcao":
            markStepAsCompleted("medidas");
            markStepAsActive("instalacao");
            changeSelectorVisibility(simulatorHeadings.step3, false);
            changeSelectorVisibility(selectors.correcao, false);
            if (windows.length > 0) {
              createWindowBtnCheckout();
              navigateToCheckout();
            } else {
              changeSelectorVisibility(simulatorHeadings.step5, true);
              changeSelectorVisibility(selectors.instalacao, true);
              currentStep = "instalacao";
            }
            break;
          case "instalacao":
            markStepAsCompleted("instalacao");
            changeSelectorVisibility(simulatorHeadings.step5, false);
            changeSelectorVisibility(selectors.instalacao, false);
            if (isNewWindow) {
              storeValues();
              createWindowBtnCheckout();
            }
            navigateToCheckout();
            break;
        }
      }
    };
    const navigateToCheckout = () => {
      simContainer.style.display = "none";
      selectWindow(windows[windows.length - 1]);
      toggleSteps();
      checkoutContain.style.display = "flex";
    };
    const populateCheckoutChoices = (window2) => {
      if (window2.inicio === "Cortina") {
        checkoutInfoEstore.style.display = "none";
        checkoutInfoCortina.style.display = "flex";
        checkoutChoices.tecido.textContent = window2.tecido;
        checkoutChoices.tipo.textContent = window2.tipo;
        checkoutChoices.bainha.textContent = window2.tipo === "Ondas" || window2.tipo === "Franzido" ? "Ba\xEDnha de Chumbo inclu\xEDda" : window2.bainha ? "Com Ba\xEDnha de Chumbo" : "Sem Ba\xEDnha de Chumbo";
        checkoutChoices.largura.textContent = window2.medidas.split(" X ")[0] + "cm Largura";
        checkoutChoices.altura.textContent = window2.medidas.split(" X ")[1] + "cm Altura";
        checkoutChoices.correcao.textContent = windows[0].correcao ? "Com Verifica\xE7\xE3o" : "Sem Verifica\xE7\xE3o";
        checkoutChoices.calha.textContent = window2.calha;
        checkoutChoices.suporte.textContent = "Suporte de " + window2.suporte;
        checkoutChoices.instalacao.textContent = windows[0].instalacao ? "Com Instala\xE7\xE3o" : "Sem Instala\xE7\xE3o";
      }
      if (window2.inicio === "Estore") {
        checkoutInfoEstore.style.display = "flex";
        checkoutInfoCortina.style.display = "none";
        checkoutChoices.estoreProduto.textContent = window2.tecido;
        checkoutChoices.estoreLargura.textContent = window2.medidas.split(" X ")[0] + "cm";
        checkoutChoices.estoreAltura.textContent = window2.medidas.split(" X ")[1] + "cm";
        checkoutChoices.estoreCorrecao.textContent = windows[0].correcao ? "Com Verifica\xE7\xE3o" : "Sem Verifica\xE7\xE3o";
        checkoutChoices.estoreInstalacao.textContent = windows[0].instalacao ? "Com Instala\xE7\xE3o" : "Sem Instala\xE7\xE3o";
      }
    };
    const populateSteps = (window2) => {
      if (window2.inicio === "Cortina") {
        markStepAsCompleted("tecido");
        markStepAsCompleted("tipo");
        markStepAsCompleted("medidas");
        markStepAsCompleted("calha");
        markStepAsCompleted("instalacao");
      }
      if (window2.inicio === "Estore") {
        markStepAsCompleted("tecido");
        markStepAsCompleted("medidasEstore");
        markStepAsCompleted("instalacaoEstore");
      }
    };
    const selectWindow = (window2) => {
      windows.forEach((w) => {
        if (w.button) {
          w.button.classList.remove("active");
        }
      });
      window2.button.classList.add("active");
      populateCheckoutChoices(window2);
      populateInputValues(window2);
      populateSelectorValues(window2);
      populateSteps(window2);
    };
    const navigateFromCheckoutToStep = (step) => {
      checkoutContain.style.display = "none";
      if (isNewWindow)
        resetSteps();
      toggleSteps();
      simContainer.style.display = "flex";
      let isEstore = false;
      if (step === "estoreLargura" || step === "estoreAltura" || step === "estoreCorrecao" || step === "estoreInstalacao" || step === "estoreProduto") {
        isEstore = true;
      }
      if (step === "largura" || step === "altura" || step === "estoreLargura" || step === "estoreAltura") {
        step = "medidas";
      }
      if (step === "estoreCorrecao" || step === "correcao") {
        step = "medidas";
      }
      if (step === "estoreInstalacao" || step === "instalacao") {
        step = "instalacao";
      }
      if (step === "estoreProduto") {
        step = "tecido";
      }
      isEstore ? toggleSteps("Estore") : toggleSteps("Cortina");
      switch (step) {
        case "inicio":
          changeSelectorVisibility(simulatorHeadings.step1, true);
          changeSelectorVisibility(selectors.inicio, true);
          break;
        case "tecido":
          isEstore ? updateProductsCMSFilter("Estore") : updateProductsCMSFilter("Cortina");
          changeSelectorVisibility(simulatorHeadings.step1, true);
          changeSelectorVisibility(selectors.tecido, true);
          break;
        case "tipo":
          changeSelectorVisibility(simulatorHeadings.step2, true);
          changeSelectorVisibility(selectors.tipo, true);
          break;
        case "medidas":
          changeSelectorVisibility(simulatorHeadings.step3, true);
          changeSelectorVisibility(selectors.medidas, true);
          break;
        case "calha":
          updateProductsCMSFilter("Calha");
          changeSelectorVisibility(simulatorHeadings.step4, true);
          changeSelectorVisibility(selectors.tecido, true);
          break;
        case "suporte":
          changeSelectorVisibility(simulatorHeadings.step4, true);
          changeSelectorVisibility(selectors.suporte, true);
          break;
        case "instalacao":
          changeSelectorVisibility(simulatorHeadings.step5, true);
          changeSelectorVisibility(selectors.instalacao, true);
          break;
      }
      currentStep = step;
      if (currentStep === "inicio") {
        return markStepAsActive("tecido");
      }
      if (isEstore) {
        if (step === "medidas" || step === "correcao") {
          markStepAsActive("medidasEstore");
        }
        if (step === "instalacao") {
          markStepAsActive("instalacaoEstore");
        }
      }
      markStepAsActive(step);
      isNewWindow = false;
    };
    const compressPdf = async (base64Pdf) => {
      const pdfBytes = Buffer.from(base64Pdf, "base64");
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const compressedPdfBytes = await pdfDoc.save();
      return Buffer.from(compressedPdfBytes).toString("base64");
    };
    const fetchImage = async (url) => {
      const response = await fetch(url);
      const imageBytes = await response.arrayBuffer();
      return imageBytes;
    };
    const generateAndDownloadPdfLIB = async () => {
      const { PDFDocument: PDFDocument2, rgb } = PDFLib;
      const pdfDoc = await PDFDocument2.create();
      const page = pdfDoc.addPage([595.28, 841.89]);
      let y = 800;
      const x = 50;
      const rightMargin = 520;
      const lineHeight = 12;
      let total = 0;
      const fontReg = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
      const clientY = y;
      let logoTest = null;
      try {
        logoTest = await loadImageFromWebflow(logoUrl);
        const pngImageBytes = await fetch(logoTest).then((res) => res.arrayBuffer());
        const pngImage = await pdfDoc.embedPng(pngImageBytes);
        const { width: originalWidth, height: originalHeight } = pngImage.scale(1);
        const logoWidth = 100;
        const logoHeight = originalHeight / originalWidth * logoWidth;
        const logoX = (page.getWidth() - logoWidth) / 2;
        page.drawImage(pngImage, {
          x: logoX,
          y: clientY - 10,
          // Align with text (slight offset to adjust for font size)
          width: logoWidth,
          height: logoHeight
        });
      } catch (error) {
        console.error("Error loading logo:", error);
      }
      const labelCliente = "Cliente:";
      const labelData = "Data:";
      const labelEmail = "Email:";
      const dateString = (/* @__PURE__ */ new Date()).toLocaleDateString();
      const labelClienteWidth = fontBold.widthOfTextAtSize(labelCliente, 8);
      const labelDataWidth = fontBold.widthOfTextAtSize(labelData, 8);
      const labelEmailWidth = fontBold.widthOfTextAtSize(labelEmail, 8);
      const dateStringWidth = fontReg.widthOfTextAtSize(dateString, 8);
      page.drawText(labelCliente, {
        x,
        y: clientY,
        size: 8,
        font: fontBold
        // Bold font for the label
      });
      page.drawText(`${selectorValues.nome}`, {
        x: x + labelClienteWidth + 2,
        // Adjust X based on the width of "Cliente:"
        y: clientY,
        size: 8,
        font: fontReg
        // Regular font for the value
      });
      const totalTextWidth = labelDataWidth + dateStringWidth + 2;
      const textX = rightMargin - totalTextWidth;
      page.drawText(labelData, {
        x: textX,
        y: clientY,
        size: 8,
        font: fontBold
        // Bold font for the label
      });
      page.drawText(dateString, {
        x: textX + labelDataWidth + 2,
        // Add a small space after "Data:"
        y: clientY,
        size: 8,
        font: fontReg
        // Regular font for the date
      });
      const emailY = clientY - lineHeight;
      page.drawText(labelEmail, {
        x,
        y: emailY,
        size: 8,
        font: fontBold
        // Bold font for the label
      });
      page.drawText(`${selectorValues.email}`, {
        x: x + labelEmailWidth + 2,
        // Adjust X based on the width of "Email:"
        y: emailY,
        size: 8,
        font: fontReg
        // Regular font for the value
      });
      y = emailY - lineHeight * 2;
      page.drawLine({
        start: { x, y },
        end: { x: rightMargin, y },
        thickness: 0.5,
        color: rgb(0, 0, 0)
      });
      y -= lineHeight;
      page.drawText("Descri\xE7\xE3o", { x, y, size: 10, fontBold });
      page.drawText("Pre\xE7o", { x: rightMargin - 100, y, size: 10, fontBold });
      y -= lineHeight;
      page.drawLine({
        start: { x, y },
        end: { x: rightMargin, y },
        thickness: 0.5,
        color: rgb(0, 0, 0)
      });
      y -= lineHeight;
      windows.forEach((window2, index) => {
        if (y < 100) {
          const newPage = pdfDoc.addPage([595.28, 841.89]);
          y = 800;
        }
        const { tecido, calha, instalacao, total: windowTotal } = calculateWindowPrice(window2);
        total += windowTotal;
        page.drawText(
          `Janela ${index + 1} - ${window2.medidas} CM - (Largura Utilizada: ${parseInt(parseFloat(window2.usedWidth).toFixed(2))} CM)`,
          { x, y, size: 8, fontBold }
        );
        y -= lineHeight;
        const items = [
          {
            label: `Tecido`,
            price: tecido,
            subItems: [
              { label: `Modelo: ${window2.tecido}` },
              { label: `Tipo de Cortina: ${window2.tipo}` },
              {
                label: `Ba\xEDnha: ${window2.tecido.startsWith("120") || window2.tecido.startsWith("122") ? "Inclu\xEDda" : window2.bainha ? "Sim" : "N\xE3o"}`
              }
            ]
          },
          {
            label: `Calha`,
            price: calha,
            subItems: [{ label: `Suporte: Suporte de ${window2.suporte}` }]
          },
          {
            label: `Instala\xE7\xE3o`,
            price: instalacao,
            subItems: []
          }
        ];
        items.forEach((item) => {
          page.drawText(`  - ${item.label}`, { x, y, size: 8, font: fontBold });
          page.drawText(`${item.price.toFixed(2)}\u20AC`, { x: rightMargin - 100, y, size: 8, fontReg });
          y -= lineHeight;
          item.subItems.forEach((subItem) => {
            page.drawText(`      \u2022 ${subItem.label}`, { x: x + 20, y, size: 8, font: fontReg });
            y -= lineHeight;
          });
          y -= lineHeight;
        });
        page.drawText(`Total`, { x, y, size: 10, font: fontBold });
        page.drawText(`${windowTotal.toFixed(2)}\u20AC`, { x: rightMargin - 100, y, size: 10, fontReg });
        y -= lineHeight;
        page.drawLine({
          start: { x, y },
          end: { x: rightMargin, y },
          thickness: 0.5,
          color: rgb(0, 0, 0)
        });
        y -= lineHeight;
      });
      const correctionLabel = !windows[0].correcao ? "Medidas facultadas pelo cliente" : "Com corre\xE7\xE3o de medidas";
      page.drawText(`Corre\xE7\xE3o: ${correctionLabel}`, { x, y, size: 10, fontReg });
      const correctionPrice = windows[0].correcao ? 30 : 0;
      total += correctionPrice;
      page.drawText(`${correctionPrice.toFixed(2)}\u20AC`, { x: rightMargin - 100, y, size: 10, fontReg });
      y -= lineHeight * 2;
      page.drawText("Total:", { x: rightMargin - 150, y, size: 12, fontBold });
      page.drawText(`${total.toFixed(2)}\u20AC`, { x: rightMargin - 100, y, size: 12, fontBold });
      y -= lineHeight * 4;
      const footerY = 100;
      page.drawText("Valores com IVA incluido \xE0 taxa em vigor. Or\xE7amento v\xE1lido por 15 dias.", {
        x,
        y: footerY,
        size: 8,
        fontReg
      });
      page.drawText(
        "Calhas j\xE1 incluem os rod\xEDzios e suportes necess\xE1rios para as medidas selecionadas.",
        { x, y: footerY - lineHeight, size: 8, fontReg }
      );
      page.drawText(
        "Valor referente \xE0 instala\xE7\xE3o e Rectifica\xE7\xE3o de Medidas sujeito a valida\xE7\xE3o do c\xF3digo postal.",
        { x, y: footerY - 2 * lineHeight, size: 8, fontReg }
      );
      page.drawText("IBAN: PT50 0000 0000 0000 0000 0", {
        x,
        y: footerY - 3 * lineHeight,
        size: 8,
        fontReg
      });
      page.drawLine({
        start: { x, y: footerY - 4 * lineHeight },
        end: { x: rightMargin, y: footerY - 4 * lineHeight },
        thickness: 0.5,
        color: rgb(0, 0, 0)
      });
      const footerText = "www.fabricstore.pt";
      const paginationText = "Pag. 1 de 1";
      const paginationWidth = fontReg.widthOfTextAtSize(paginationText, 8);
      const paginationCenterX = (page.getWidth() - paginationWidth) / 2;
      page.drawText(footerText, { x, y: footerY - 5 * lineHeight, size: 10, fontReg });
      page.drawText(paginationText, {
        x: paginationCenterX,
        y: footerY - 5 * lineHeight,
        size: 8,
        fontReg
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Orcamento_Fabric-Store.pdf";
      link.click();
      return blob;
    };
    const generateTxt = async () => {
      let total = 0;
      let txtContent = "";
      txtContent += `Data: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}

`;
      txtContent += `Cliente: ${selectorValues.nome}

`;
      txtContent += `Email: ${selectorValues.email}

`;
      const correctionLabel = !windows[0].correcao ? "  Medidas facultadas pelo cliente:" : "  Com corre\xE7\xE3o de medidas:";
      const correctionPrice = windows[0].correcao ? 30 : 0;
      windows.forEach((window2, index) => {
        const {
          usedWidth,
          productPrice,
          manufacturingPrice,
          bainhaPrice,
          calhaPrice,
          instalationPrice,
          windowTotal
        } = calculateWindowPrice(window2);
        total += windowTotal;
        txtContent += `Janela ${index + 1} - ${window2.medidas} CM - (Largura Utilizada: ${parseInt(parseFloat(usedWidth).toFixed(2))} CM): ${windowTotal.toFixed(2)}\u20AC

`;
        txtContent += `  Pre\xE7o do Produto: ${productPrice.toFixed(2)}\u20AC
`;
        txtContent += `  Pre\xE7o de Fabrica\xE7\xE3o: ${manufacturingPrice.toFixed(2)}\u20AC
`;
        txtContent += `  Pre\xE7o da Bainha: ${bainhaPrice.toFixed(2)}\u20AC
`;
        txtContent += `  Pre\xE7o da Calha: ${calhaPrice.toFixed(2)}\u20AC
`;
        txtContent += `  Pre\xE7o da Instala\xE7\xE3o: ${instalationPrice.toFixed(2)}\u20AC

`;
      });
      txtContent += `Corre\xE7\xE3o:
${correctionLabel} ${correctionPrice.toFixed(2)}\u20AC

`;
      total += correctionPrice;
      txtContent += `Total: ${total.toFixed(2)}\u20AC

`;
      const txtBlob = new Blob([txtContent], { type: "text/plain" });
      const txtLink = document.createElement("a");
      txtLink.href = URL.createObjectURL(txtBlob);
      txtLink.download = "Orcamento_Fabric-Store.txt";
      txtLink.click();
      return txtBlob;
    };
    const loadImageFromWebflow = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext("2d");
          context.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        };
        img.onerror = (error) => {
          reject(new Error(`Failed to load image from ${url}: ${error.message}`));
        };
      });
    };
    const animateOpacity = (element) => {
      element.classList.add("show");
      gsap.fromTo(element, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power1.in" });
    };
    const toggleSteps = (productType) => {
      if (!productType) {
        cortinaSteps.style.display = "none";
        estoreSteps.style.display = "none";
      }
      if (productType === "Cortina") {
        cortinaSteps.style.display = "flex";
        estoreSteps.style.display = "none";
      }
      if (productType === "Estore") {
        cortinaSteps.style.display = "none";
        estoreSteps.style.display = "flex";
      }
    };
    const changeSelectorVisibility = (selector, visible) => {
      selector.style.display = visible ? "flex" : "none";
    };
    const resetSteps = () => {
      Object.keys(steps).forEach((key) => {
        steps[key].classList.remove("active");
        steps[key].classList.add("next");
        steps[key].classList.remove("done");
        steps[key].getElementsByClassName("step_number")[0].classList.remove("active");
        steps[key].getElementsByClassName("step_description")[0].textContent = "Escolha";
      });
    };
    const markStepAsCompleted = (step) => {
      steps[step].classList.remove("active");
      steps[step].classList.remove("next");
      steps[step].classList.add("done");
      steps[step].getElementsByClassName("step_number")[0].classList.remove("active");
      if (steps[step].getElementsByClassName("step_description")[0].classList.contains("next")) {
        steps[step].getElementsByClassName("step_description")[0].classList.remove("next");
      }
      steps[step].getElementsByClassName("step_description")[0].textContent = selectorValues[step];
      if (step === "instala\xE7\xE3o") {
        steps.instalacaoEstore?.classList.remove("active");
        steps.instalacaoEstore?.classList.remove("next");
        steps.instalacaoEstore?.classList.add("done");
        steps.instalacaoEstore?.getElementsByClassName("step_number")[0].classList.remove("active");
        steps.instalacaoEstore.getElementsByClassName("step_description")[0].textContent = selectorValues.instalacao ? "c/Instala\xE7\xE3o" : "s/Instala\xE7\xE3o";
      }
      if (step === "medidas") {
        if (windows.length > 0) {
          steps[step].getElementsByClassName("step_description")[0].innerHTML += windows[0].correcao ? "<br>c/Verifica\xE7\xE3o" : "<br>s/Verifica\xE7\xE3o";
        } else {
          steps[step].getElementsByClassName("step_description")[0].innerHTML += selectorValues.correcao ? "<br>c/Verifica\xE7\xE3o" : "<br>s/Verifica\xE7\xE3o";
        }
        steps.medidasEstore?.classList.remove("active");
        steps.medidasEstore?.classList.remove("next");
        steps.medidasEstore?.classList.add("done");
        steps.medidasEstore?.getElementsByClassName("step_number")[0].classList.remove("active");
        steps.medidasEstore.getElementsByClassName("step_description")[0].textContent = `${larguraInput?.value} X ${alturaInput?.value}cm`;
        steps.medidasEstore.getElementsByClassName("step_description")[0].innerHTML += `${selectorValues.correcao ? "<br>c/Verifica\xE7\xE3o" : "<br>s/Verifica\xE7\xE3o"}`;
      }
      if (step === "tipo") {
        steps[step].getElementsByClassName("step_description")[0].innerHTML += `${selectorValues.bainha ? "<br>c/Ba\xEDnha de Chumbo" : "<br>s/Ba\xEDnha de Chumbo"}`;
      }
    };
    const markStepAsActive = (step) => {
      steps[step].classList.remove("next");
      steps[step].classList.add("active");
      steps[step].getElementsByClassName("step_number")[0].classList.add("active");
      if (step === "instalacao") {
        steps.instalacaoEstore?.classList.remove("next");
        steps.instalacaoEstore?.classList.add("active");
        steps.instalacaoEstore?.getElementsByClassName("step_number")[0].classList.add("active");
      }
      if (step === "medidas") {
        steps.medidasEstore?.classList.remove("next");
        steps.medidasEstore?.classList.add("active");
        steps.medidasEstore?.getElementsByClassName("step_number")[0].classList.add("active");
      }
    };
    const markStepAsNext = (stepToMark) => {
      let step = stepToMark;
      if (step === "suporte") {
        step = "calha";
      }
      if (steps[step].classList.contains("active")) {
        steps[step].classList.remove("active");
        steps[step].getElementsByClassName("step_number")[0].classList.remove("active");
      }
      if (step === "instalacao") {
        steps.instalacaoEstore?.classList.remove("active");
        steps.instalacaoEstore?.getElementsByClassName("step_number")[0].classList.remove("active");
      }
      if (step === "medidas") {
        steps.medidasEstore?.classList.remove("active");
        steps.medidasEstore?.getElementsByClassName("step_number")[0].classList.remove("active");
      }
      if (!isNewWindow || validateSelector())
        return markStepAsCompleted(step);
      steps[step].classList.add("next");
      if (steps[step].querySelector("step_description") && !steps[step].querySelector("step_description")[0].classList.contains("next")) {
        steps[step].querySelector("step_description")[0].classList.add("next");
      }
      if (step === "instalacao") {
        steps.instalacaoEstore?.classList.add("next");
      }
      if (step === "medidas") {
        steps.medidasEstore?.classList.add("next");
      }
    };
    const activateNextBtn = (isActive) => {
      if (isActive) {
        if (nextButton?.classList.contains("inactive")) {
          nextButton.classList.remove("inactive");
        }
      }
      if (!isActive) {
        if (!nextButton?.classList.contains("inactive")) {
          nextButton.classList.add("inactive");
        }
      }
    };
    const activateColor = (color) => {
      color.classList.add("active");
    };
    const deactivateColor = (color) => {
      color.classList.remove("active");
    };
    const activateCard = (card) => {
      const title = card.getElementsByTagName("h1")[0];
      const imageContain = card.getElementsByClassName("tecido_image_contain")[0];
      card.classList.add("selected");
      title.classList.add("active");
      imageContain.classList.add("active");
    };
    const deactivateCard = (card) => {
      const title = card.getElementsByTagName("h1")[0];
      const imageContain = card.getElementsByClassName("tecido_image_contain")[0];
      card.classList.remove("selected");
      title.classList.remove("active");
      imageContain.classList.remove("active");
    };
    const addOnClickToInicioCards = () => {
      const cards = document.querySelectorAll("[id^='inicio-card']");
      cards.forEach((card) => {
        card.addEventListener("click", () => {
          const productType = card.getElementsByTagName("h1")[0].textContent;
          activateCard(card, selectors.inicio);
          cards.forEach((cardFromList) => {
            if (cardFromList !== card) {
              deactivateCard(cardFromList);
            }
          });
          updateProductsCMSFilter(productType);
          updateSelectorValue(selectors.inicio, productType);
          if (validateSelector())
            activateNextBtn(true);
        });
      });
    };
    const addOnClickToTecidoCards = () => {
      const cards = document.querySelectorAll("[id^='tecido-card']");
      const colors = document.querySelectorAll(".tecido_color");
      cards.forEach((card) => {
        card.addEventListener("click", () => {
          const cardProduct = getProductFromCard(card);
          const cardColor = getColorFromCard(card);
          const existingSelection = selectedColors.find((color) => color.product === cardProduct);
          const cardColors = card.getElementsByClassName("tecido_color");
          colors.forEach((color) => deactivateColor(color));
          activateCard(card, selectors.tecido);
          cards.forEach((cardFromList) => {
            if (cardFromList !== card) {
              deactivateCard(cardFromList);
            }
          });
          if (existingSelection) {
            for (let i = 0; i < cardColors.length; i++) {
              if (cardColors.item(i).id === `${existingSelection.color}`) {
                activateColor(cardColors.item(i));
              }
            }
            if (currentStep === "tecido") {
              updateSelectorValue(selectors.tecido, existingSelection.color);
            }
            if (currentStep === "calha") {
              updateCalhaValue(existingSelection.color);
            }
          } else {
            cardColors.length > 0 && activateColor(cardColors[0]);
            if (currentStep === "tecido" && cardColor !== "") {
              updateSelectorValue(selectors.tecido, `${cardColor}`);
            }
            if (currentStep === "calha" && cardColor !== "") {
              updateCalhaValue(cardColor);
            }
          }
          if (validateSelector())
            activateNextBtn(true);
        });
      });
    };
    const addOnClickColor = () => {
      const colors = document.querySelectorAll(".tecido_color");
      colors.forEach((color) => {
        color.addEventListener("click", (event) => {
          const selectedDiv = event.currentTarget;
          const selectedColor = selectedDiv && selectedDiv.id;
          activateColor(selectedDiv);
          colors.forEach((colorFromList) => {
            if (colorFromList !== selectedDiv) {
              deactivateColor(colorFromList);
            }
          });
          const product = selectedColor ? selectedColor.split("-")[0] : "";
          const latestSelection = selectedColors.find((color2) => color2.product === product);
          if (latestSelection) {
            latestSelection.color = `${selectedColor}`;
          } else {
            selectedColors.push({ product, color: `${selectedColor}` });
          }
          const cardThumbnailImage = selectedDiv.parentElement.parentElement.parentElement.parentElement.parentElement.getElementsByClassName(
            "tecido_image"
          )[0];
          for (let i = 0; i < colors.length; i++) {
            if (colors[i].getAttribute("id") === selectedColor) {
              const displayImg = colors[i].querySelector(".source");
              if (displayImg) {
                cardThumbnailImage.setAttribute("src", displayImg.getAttribute("src"));
              } else {
                cardThumbnailImage.setAttribute(
                  "src",
                  colors[i].getElementsByTagName("img")[0].getAttribute("src")
                );
              }
              cardThumbnailImage.setAttribute("srcset", "");
              break;
            }
          }
          if (currentStep === "calha" && selectedColor !== "") {
            return updateCalhaValue(selectedColor);
          }
          if (currentStep === "tecido" && selectedColor !== "") {
            return updateSelectorValue(selectors.tecido, selectedColor);
          }
          return console.log("No color was stored");
        });
      });
    };
    const addOnClickToTipoCards = () => {
      const cards = document.querySelectorAll("[id^='tipo-card']");
      cards.forEach((card) => {
        card.addEventListener("click", () => {
          activateCard(card, selectors.tipo);
          cards.forEach((cardFromList) => {
            if (cardFromList !== card) {
              deactivateCard(cardFromList);
            }
          });
          updateSelectorValue(selectors.tipo, card.getElementsByTagName("h1")[0].textContent);
          if (validateSelector())
            activateNextBtn(true);
        });
      });
    };
    const addOnClickBainha = () => {
      bainhaInput.addEventListener("change", function(event) {
        updateSelectorValue(selectors.bainha, bainhaInput.checked);
      });
    };
    const addOnChangeSuporteRadioBtns = () => {
      paredeRadioBtn?.addEventListener("change", (event) => {
        if (paredeRadioBtn?.checked === true || tectoRadioBtn?.checked === true) {
          updateSuporteValue("Parede");
          if (validateSelector())
            activateNextBtn(true);
        }
      });
      tectoRadioBtn?.addEventListener("change", (event) => {
        if (paredeRadioBtn?.checked === true || tectoRadioBtn?.checked === true) {
          updateSuporteValue("Tecto");
          if (validateSelector())
            activateNextBtn(true);
        }
      });
    };
    const addOnChangeMedidasInputs = () => {
      larguraInput?.addEventListener("input", (event) => {
        if (larguraInput?.value === "" || alturaInput?.value === "") {
          return;
        }
        validateSelector() && updateSelectorValue(selectors.medidas, `${larguraInput?.value} X ${alturaInput?.value}`);
        if (!(larguraInput?.value === "") && !(alturaInput?.value === "")) {
          validateSelector() ? activateNextBtn(true) : activateNextBtn(false);
        }
      });
      alturaInput?.addEventListener("input", (event) => {
        if (larguraInput?.value === "" || alturaInput?.value === "") {
          return;
        }
        validateSelector() && updateSelectorValue(selectors.medidas, `${larguraInput?.value} X ${alturaInput?.value}`);
        if (!(larguraInput?.value === "") && !(alturaInput?.value === "")) {
          validateSelector() ? activateNextBtn(true) : activateNextBtn(false);
        }
      });
    };
    const addOnClickCorrecao = () => {
      correcaoInput.addEventListener("change", function(event) {
        updateSelectorValue(selectors.correcao, correcaoInput.checked);
      });
    };
    const addOnClickInstalacao = () => {
      instalacaoInput.addEventListener("change", function(event) {
        updateSelectorValue(selectors.instalacao, instalacaoInput.checked);
      });
    };
    const addOnClickStep = () => {
      Object.keys(steps).forEach((key) => {
        steps[key].addEventListener("click", () => {
          navigateToStep(key);
        });
      });
    };
    const addOnClickCheckoutChoices = () => {
      Object.keys(checkoutChoices).forEach((key) => {
        checkoutChoices[key].addEventListener("click", () => {
          if (key === "correcao" || key === "estoreCorrecao") {
            return;
          }
          if (key === "suporte") {
            return;
          }
          if (key === "bainha") {
            return;
          }
          navigateFromCheckoutToStep(key);
        });
      });
    };
    const addOnClickToWindowBtn = (window2) => {
      window2.button.addEventListener("click", () => {
        selectWindow(window2);
      });
    };
    const addOnClickEnviar = () => {
      enviarButton.addEventListener("click", async () => {
        selectorValues.nome = nomeInput.value;
        selectorValues.email = emailInput.value;
        selectorValues.contacto = contactoSwitch.checked;
        const pdfBytes = await generateAndDownloadPdfLIB();
        const txtBytes = await generateTxt();
        await sendQuoteEmail(
          selectorValues.nome,
          selectorValues.email,
          selectorValues.contacto,
          pdfBytes,
          txtBytes
        );
      });
    };
    const addOnClickNewWindow = () => {
      newWindowButton.addEventListener("click", createWindow);
    };
    const addOnClickNoWindow = () => {
      noWindowButton.addEventListener("click", () => {
        newWindowContain.style.display = "none";
        checkoutFormContain.style.display = "flex";
      });
    };
    const addOnClickNextButton = () => {
      nextButton.addEventListener("click", advanceStep);
    };
    const calculateUsedWidth = (window2) => {
      const usedWidth = MANUFACTURING_CONSTANTS.usedWidths.find((usedWidth2) => {
        return window2.tipo === usedWidth2.name;
      });
      if (usedWidth) {
        const width = window2.medidas ? parseInt(window2.medidas.split(" X ")[0]) : 0;
        return width * usedWidth.widthRatio + MANUFACTURING_CONSTANTS.bainhaPrice.widthMargin;
      }
      return 0;
    };
    const calculateMaterialPrice = (window2, usedWidth) => {
      const width = window2.medidas.split(" X ")[0];
      let productPrice = 0, calhaPrice = 0;
      const prices = getProductPrice(window2);
      if (window2.inicio === "Cortina") {
        productPrice = prices.product * (usedWidth / 100);
        calhaPrice = prices.calha;
      }
      if (window2.inicio === "Estore") {
        productPrice = prices.product;
      }
      return { product: productPrice, calha: calhaPrice };
    };
    const calculateManufacturingPrice = (window2, usedWidth) => {
      if (window2.inicio === "Estore") {
        return 0;
      }
      const manufacturingPrice = MANUFACTURING_CONSTANTS.manufacturingPrices.find(
        (price) => window2.tipo === price.name
      );
      if (manufacturingPrice) {
        return window2.tecido.startsWith("8") ? manufacturingPrice.blackout * (usedWidth / 100) : (
          // : (window2.tecido.startsWith('120') || window2.tecido.startsWith('122')) &&
          window2.tecido.startsWith("9") && // Alinhado
          (window2.tipo === "Ondas" || window2.tipo === "Franzido") ? manufacturingPrice.alinhado * (usedWidth / 100) : manufacturingPrice.normal * (usedWidth / 100)
        );
      }
      return 0;
    };
    const calculateBainhaPrice = (window2, usedWidth) => {
      if (window2.inicio === "Cortina" && (window2.tecido.startsWith("120") || window2.tecido.startsWith("122"))) {
        return 0;
      }
      if (window2.inicio === "Estore") {
        return 0;
      }
      if (window2.bainha) {
        return MANUFACTURING_CONSTANTS.bainhaPrice.price * (usedWidth / 100);
      }
      return 0;
    };
    const calculateMeasuresCheckPrice = (window2) => {
      return !window2.correcao ? 0 : MANUFACTURING_CONSTANTS.measuresCheckPrice;
    };
    const calculateInstalationPrice = (window2) => {
      if (!windows[0].instalacao) {
        return 0;
      }
      let instalationPrice = 0;
      const largura = parseInt(window2.medidas.split(" X ")[0]);
      const instalationPriceDetails = MANUFACTURING_CONSTANTS.instalation.find(
        (price) => largura <= price.maxWidth
      );
      instalationPriceDetails && (instalationPrice = instalationPriceDetails.price);
      instalationPriceDetails && window2.inicio === "Cortina" && window2.calha.startsWith("9500") && (instalationPrice *= 2);
      return instalationPrice ? instalationPrice : 0;
    };
    const calculateWindowPrice = (window2) => {
      const totalWidth = calculateUsedWidth(window2);
      const materialPrice = calculateMaterialPrice(window2, totalWidth);
      const manufacturingPrice = calculateManufacturingPrice(window2, totalWidth);
      const bainhaPrice = calculateBainhaPrice(window2, totalWidth);
      const instalationPrice = calculateInstalationPrice(window2);
      const result = materialPrice.product + manufacturingPrice + bainhaPrice + materialPrice.calha + instalationPrice;
      window2.totalPrice = result;
      return {
        tecido: materialPrice.product + manufacturingPrice + bainhaPrice,
        calha: materialPrice.calha,
        instalacao: instalationPrice,
        total: result
      };
    };
    const isValidEmail = (email) => {
      const atPosition = email.indexOf("@");
      return atPosition > 0 && atPosition < email.length - 1;
    };
    const blobToBase64 = (blob) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
    const resetCheckoutErrors = () => {
      nameError.textContent = "";
      emailError.textContent = "";
      checkFieldError.textContent = "";
      nameError.classList.remove("u-text-main");
      emailError.classList.remove("u-text-main");
      checkFieldError.classList.remove("u-text-main");
    };
    const sendQuoteEmail = async (name, email, allowsContact, base64PdfPromise, base64TxtPromise) => {
      const feedbackMessage2 = document.getElementById("feedback-div");
      let pdfFile = null;
      let txtFile = null;
      let errorExists = false;
      resetCheckoutErrors();
      if (name.trim() === "") {
        nameError.textContent = "Preencher este campo obrigat\xF3rio";
        nameError.classList.add("u-text-main");
        errorExists = true;
      }
      const emailValue = email.trim();
      if (emailValue === "") {
        emailError.textContent = "Preencher este campo obrigat\xF3rio";
        emailError.classList.add("u-text-main");
        errorExists = true;
      } else if (!isValidEmail(emailValue)) {
        emailError.textContent = "Insira um email v\xE1lido";
        emailError.classList.add("u-text-main");
        errorExists = true;
      }
      if (!errorExists) {
        try {
          const base64Pdf = await base64PdfPromise;
          const base64Txt = await base64TxtPromise;
          pdfFile = await blobToBase64(base64Pdf);
          txtFile = await blobToBase64(base64Txt);
        } catch {
          console.error("Failed to load PDF");
          pdfFile = null;
        }
        const templateParamsPdf = {
          name,
          email,
          check: allowsContact,
          // file: [{ base64: pdfFile, filename: 'Orcamento_Fabric-Store.pdf' }],
          file: pdfFile,
          to_company_email: "contact@fabricstore.pt",
          // The company's email
          to_user_email: email,
          // Send a copy to the user
          reply_to: "general@brightweb.tech"
        };
        const templateParamsTxt = {
          name,
          email,
          check: allowsContact,
          file: txtFile,
          to_company_email: "contact@fabricstore.pt",
          reply_to: "general@brightweb.tech"
        };
        emailjs.send("service_fabricstore", "template_quote_pdf", templateParamsPdf).then(
          function(response) {
            console.log("SUCCESS!", response.status, response.text);
            userDetailsForm.style.display = "none";
            enviarButton.style.display = "none";
            feedbackMessage2.textContent = "Obrigado pelo seu contacto!";
          },
          function(error) {
            console.log("FAILED...", error);
            userDetailsForm.style.display = "none";
            enviarButton.style.display = "none";
            feedbackMessage2.textContent = "Oops! Algo correu mal!";
          }
        );
        emailjs.send("service_fabricstore", "template_quote_txt", templateParamsTxt).then(
          function(response) {
            console.log("SUCCESS!", response.status, response.text);
            userDetailsForm.style.display = "none";
            enviarButton.style.display = "none";
            feedbackMessage2.textContent = "Obrigado pelo seu contacto!";
          },
          function(error) {
            console.log("FAILED...", error);
            userDetailsForm.style.display = "none";
            enviarButton.style.display = "none";
            feedbackMessage2.textContent = "Oops! Algo correu mal!";
          }
        );
      }
    };
    const swiperConfiguration = {
      spaceBetween: 12,
      allowTouchMove: false,
      // Disable touch-based swiping (optional)
      resistanceRatio: 0,
      // Prevents users from dragging/swiping past the last slide
      watchOverflow: true,
      // Disables swiper if the slides are fewer than the container width
      keyboard: {
        enabled: true,
        onlyInViewport: false
      },
      navigation: {
        nextEl: ".slider-main_button.swiper-btn-next",
        prevEl: ".slider-main_button.swiper-btn-prev"
      },
      breakpoints: {
        320: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        640: {
          slidesPerView: 3
          // Adjust according to your design
        },
        1024: {
          slidesPerView: 6
        }
      }
    };
    let swiper = new Swiper(".swiper", swiperConfiguration);
    const resetSwiper = () => {
      swiper.destroy();
      swiper = new Swiper(".swiper", swiperConfiguration);
    };
    const createDummyWindows = () => {
      let windowWidth = 125;
      for (let i = 0; i < 5; i++) {
        windowWidth = 125 + i * 125;
        windows.push({
          inicio: "Cortina",
          tecido: "101015-003",
          tipo: "Ondas",
          medidas: `${windowWidth} X 250`,
          correcao: i % 2 === 0 ? false : true,
          calha: "5000-Branco",
          instalacao: i % 2 === 0 ? true : false
        });
      }
    };
    const createEddieWoodWindows = () => {
      windows.push({
        inicio: "Cortina",
        tecido: "120100-008",
        tipo: "Franzido",
        medidas: `200 X 250`,
        correcao: true,
        calha: "5000-B",
        instalacao: true
      });
    };
    const createRitaAbreuWindows = () => {
      const ritaAbreuWindows = [
        {
          inicio: "Cortina",
          tecido: "120100-008",
          tipo: "Ondas",
          bainha: true,
          medidas: `285 X 150`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        },
        {
          inicio: "Cortina",
          tecido: "120100-008",
          tipo: "Ondas",
          bainha: true,
          medidas: `240 X 268`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        },
        {
          inicio: "Cortina",
          tecido: "120100-008",
          tipo: "Ondas",
          bainha: true,
          medidas: `285 X 268`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        },
        {
          inicio: "Cortina",
          tecido: "120100-008",
          tipo: "Ondas",
          bainha: true,
          medidas: `280 X 268`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        },
        {
          inicio: "Cortina",
          tecido: "120100-008",
          tipo: "Ondas",
          bainha: true,
          medidas: `285 X 268`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        }
      ];
      emailInput.value = "ritabreu@test.pt";
      nomeInput.value = "Rita Abreu";
      windows.push(...ritaAbreuWindows);
    };
    const createRitaAbreuWindows2 = () => {
      const ritaAbreuWindows = [
        {
          inicio: "Cortina",
          tecido: "118060-024",
          tipo: "Ondas",
          bainha: true,
          medidas: `285 X 150`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        },
        {
          inicio: "Cortina",
          tecido: "118060-024",
          tipo: "Ondas",
          bainha: true,
          medidas: `348 X 268`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        },
        {
          inicio: "Cortina",
          tecido: "118060-024",
          tipo: "Ondas",
          bainha: true,
          medidas: `240 X 268`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        },
        {
          inicio: "Cortina",
          tecido: "118060-024",
          tipo: "Ondas",
          bainha: true,
          medidas: `285 X 268`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        },
        {
          inicio: "Cortina",
          tecido: "118060-024",
          tipo: "Ondas",
          bainha: true,
          medidas: `280 X 268`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        },
        {
          inicio: "Cortina",
          tecido: "118060-024",
          tipo: "Ondas",
          bainha: true,
          medidas: `285 X 268`,
          correcao: true,
          calha: "5000-B",
          suporte: "Parede",
          instalacao: true
        }
      ];
      emailInput.value = "ritabreu@test.pt";
      nomeInput.value = "Rita Abreu";
      windows.push(...ritaAbreuWindows);
    };
    const createMafaldaCoelhoWindows = () => {
      const mafaldaCoelhoWindows = [
        {
          inicio: "Cortina",
          tecido: "120100-008",
          tipo: "Ondas",
          medidas: `360 X 150`,
          correcao: false,
          calha: "5000-B",
          instalacao: false
        }
      ];
      windows.push(...mafaldaCoelhoWindows);
    };
    const createHelderPintoWindows = () => {
      const helderPintoWindows = [
        {
          inicio: "Cortina",
          tecido: "120100-008",
          tipo: "Ondas",
          medidas: `350 X 240`,
          correcao: true,
          calha: "5000-B",
          instalacao: true
        }
      ];
      windows.push(...helderPintoWindows);
    };
    onInit();
  });
})();
//# sourceMappingURL=index.js.map
