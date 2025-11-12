// Quan es rep el senyal del tresor
radio.onReceivedString(function (receivedString) {
    if (receivedString == "tresor" && !(jaHeEnviat)) {
        detectantTresor = true
        forcaSenyal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
        // Convertir força del senyal a brillantor
        brillantor = Math.map(forcaSenyal, -128, -50, 50, 255)
        brillantor = Math.constrain(brillantor, 50, 255)
        led.setBrightness(brillantor)
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    }
})
// Botó B: Enviar confirmació quan es detecta el tresor
input.onButtonPressed(Button.B, function () {
    if (detectantTresor && !(jaHeEnviat)) {
        // Enviar el nostre ID al tresor
        radio.sendString(meuId)
        jaHeEnviat = true
        // Confirmació visual
        basic.showIcon(IconNames.Yes)
        basic.pause(1000)
        basic.clearScreen()
        led.setBrightness(255)
        detectantTresor = false
    } else if (!(detectantTresor)) {
        // No es detecta el tresor
        basic.showIcon(IconNames.No)
        basic.pause(1000)
        basic.clearScreen()
    }
})
let brillantor = 0
let forcaSenyal = 0
let detectantTresor = false
let jaHeEnviat = false
let meuId = ""
radio.setGroup(7)
// Canvia X pel número de cada caçador (1-8)
meuId = "caçadorX"
// Mostrar ID al iniciar
basic.showString(meuId)
basic.pause(1000)
basic.clearScreen()
// Reset periòdic per permetre noves deteccions
basic.forever(function () {
    basic.pause(3000)
    if (!(detectantTresor)) {
        jaHeEnviat = false
    }
})
