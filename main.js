const { WAConnection, Browsers } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
baterai = 'unknown'
charging = 'unknown'

//nocache
require('./Xrutz.js')
nocache('../Xrutz.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'cyan'), 'File is updated!'))
require('./message/group.js')
nocache('../message/group.js', module => console.log(color('[WATCH]', 'yellow'), color(`'${module}'`, 'yellow'), 'File is updated!'))

const starts = async (Xrutz = new WAConnection()) => {
	Xrutz.logger.level = 'warn'
	console.log(color(figlet.textSync('XRUTZ V2', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 50,
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[ ! ] SUPPORT ME ON SOCIAL MEDIA!', 'cyan'), color('\nYOUTUBE : XRUTZ OFFICIAL', 'red'), color('\nINSTAGRAM : @RELLNJOY_', 'yellow'), color('\nTIKTOK : RELL.AXBRADER'), color('\nSCRIPT ORIGINAL BY KURRXD TAMVAN', 'blue'))
	console.log(color('\nBUTUH BANTUAN? HUBUNGI : 083871990243', 'cyan'))
	console.log(color('[ SOURCE CODE INI HASIL RECODE OLEH XRUTZ OFFICIAL ]', 'red'))
    Xrutz.browserDescription = ["XRUTZ BOT", "Chrome", "3.0.0"];

	// Menunggu QR
	Xrutz.on('qr', () => {
		console.log(color('[', 'yellow'), color('!', 'red'), color(']', 'yellow'), color('SCAN! MAKSIMAL 20 DETIK'))
	})

	// Menghubungkan
	fs.existsSync(`./${setting.sessionName}.json`) && Xrutz.loadAuthInfo(`./${setting.sessionName}.json`)
	Xrutz.on('connecting', () => {
		console.log(color('\n[ XRUTZ OFFC ]', 'yellow'), color('PROSES NYAMBUNG...'));
	})
const spinner = { 
  "interval": 120,
  "frames": [
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official",
    "Xrutz Official"
  ]}

	//connect
	Xrutz.on('open', () => {
		console.log(color('[ XRUTZ OFFC ]', 'yellow'), color('BOT SUDAH AKTIF! SELAMAT MENGGUNAKAN'));
	})

	// session
	await Xrutz.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(Xrutz.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	Xrutz.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log(color('Sisa Baterai : ' + batterylevel + '%', 'red'))
	})
	global.batrei = global.batrei ? global.batrei : []
	Xrutz.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})

	// Welcome
	Xrutz.on('group-participants-update', async (anu) => {
		await welcome(Xrutz, anu)
	})

	Xrutz.on('chat-update', async (message) => {
		require('./Xrutz.js')(Xrutz, message)
	})
}

starts()