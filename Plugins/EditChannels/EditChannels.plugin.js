//META{"name":"EditChannels"}*//

class EditChannels {
	constructor () {
		
		this.labels;
		
		this.channelObserver;
		this.channelListObserver;
		this.channelContextObserver;
    
		this.css = `
			<style class='editchannels'>

			.pick-wrap {
				position: relative;
				padding: 0;
				margin: 0;
			}

			.pick-wrap .color-picker-popout {
				position: absolute;
			}

			.ui-color-picker-swatch1 {
				width: 22px;
				height: 22px;
				margin-bottom: 5px;
				margin-top: 5px;
				border: 4px solid transparent;
				border-radius: 12px;
			}

			.ui-color-picker-swatch1.large {
				min-width: 62px;
				height: 62px;
				border-radius: 25px;
			}

			.ui-color-picker-swatch1.nocolor {
				cursor: default;
				line-height: 22px;
				color: red;
				font-size: 28px;
				font-weight: bold;
				border: 4px solid red;
			}
			
			.editchannels-modal .modal {
				align-content: space-around;
				align-items: center;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: center;
				max-height: 660px;
				min-height: 340px;
				opacity: 0;
				padding-bottom: 60px;
				padding-top: 60px;
				pointer-events: none;
				position: absolute;
				user-select: none;
				width: 100%;
				z-index: 1000;
			}
			
			.editchannels-modal .form {
				width: 100%;
			}

			.editchannels-modal .form-header, .editchannels-modal .form-actions {
				background-color: rgba(32,34,37,.3);
				box-shadow: inset 0 1px 0 rgba(32,34,37,.6);
				padding: 20px;
				
			}

			.editchannels-modal .form-header {
				color: #f6f6f7;
				cursor: default;
				font-size: 16px;
				font-weight: 600;
				letter-spacing: .3px;
				line-height: 20px;
				text-transform: uppercase;
			}

			.editchannels-modal .form-actions {
				display: flex;
				flex-direction: row-reverse;
				flex-wrap: nowrap;
				flex: 0 0 auto;
				padding-right: 32px;
			}

			.editchannels-modal .form-inner{
				margin: 10px 0;
				max-height: 360px;
				overflow-x: hidden;
				overflow-y: hidden;
				padding: 0 20px;
				
			}

			.editchannels-modal .modal-inner {
				background-color: #36393E;
				border-radius: 5px;
				box-shadow: 0 0 0 1px rgba(32,34,37,.6),0 2px 10px 0 rgba(0,0,0,.2);
				display: flex;
				min-height: 200px;
				pointer-events: auto;
				width: 470px;
			}

			.editchannels-modal input {
				color: #f6f6f7;
				background-color: rgba(0,0,0,.1);
				border-color: rgba(0,0,0,.3);
				padding: 10px;
				height: 40px;
				box-sizing: border-box;
				width: 100%;
				border-width: 1px;
				border-style: solid;
				border-radius: 3px;
				outline: none;
				transition: background-color .15s ease,border .15s ease;
			}

			.editchannels-modal .btn {
				align-items: center;
				background: none;
				border-radius: 3px;
				border: none;
				box-sizing: border-box;
				display: flex;
				font-size: 14px;
				font-weight: 500;
				justify-content: center;
				line-height: 16px;
				min-height: 38px;
				min-width: 96px;
				padding: 2px 16px;
				position: relative;
			}

			.editchannels-modal .btn-cancel {
				background-color: #2f3136;
				color: #fff;
			}

			.editchannels-modal .btn-save {
				background-color: #3A71C1;
				color: #fff;
			}

			.editchannels-modal .control-group label {
				color: #b9bbbe;
				letter-spacing: .5px;
				text-transform: uppercase;
				flex: 1;
				cursor: default;
				margin-bottom: 8px;
				margin-top: 0;
				font-weight: 600;
				line-height: 16px;
				font-size: 12px;
			}

			.editchannels-modal .control-group {
				margin-top: 10px;
			}

			'</style>`;

		this.channelContextEntryMarkup =
			`<div class="item-group">
				<div class="item localsettings-item item-subMenu">
					<span>REPLACE_context_localsettings_text</span>
					<div class="hint"></div>
				</div>
			</div>`;
			
		this.channelContextSubMenuMarkup = 
			`<div class="context-menu localChannelSettingsSubMenu">
				<div class="item-group">
					<div class="item channelsettings-item">
						<span>REPLACE_submenu_channelsettings_text</span>
						<div class="hint"></div>
					</div>
					<div class="item resetsettings-item">
						<span>REPLACE_submenu_resetsettings_text</span>
						<div class="hint"></div>
					</div>
				</div>
			</div>`;

		this.channelSettingsModalMarkup =
			`<span class="editchannels-modal">
				<div class="callout-backdrop" style="background-color:#000; opacity:0.85"></div>
				<div class="modal" style="opacity: 1">
					<div class="modal-inner">
						<form class="form">
							<div class="form-header">
								<header class="modal-header">REPLACE_modal_header_text</header>
							</div>
							<div class="form-inner">
								<div class="control-group">
									<label class="modal-text-label" for="modal-text">REPLACE_modal_channelname_text</label>
									<input type="text" id="modal-text" name="text">
								</div>
								<div class="control-group">
									<label class="color-picker1-label">REPLACE_modal_colorpicker1_text</label>
									<div class="color-picker1">
										<div class="swatches1"></div>
									</div>
								</div>
							</div>
							<div class="form-actions">
								<button type="button" class="btn btn-cancel">REPLACE_btn_cancel_text</button>
								<button type="submit" class="btn btn-save">REPLACE_btn_save_text</button>
							</div>
						</form>
					</div>
				</div>
			</span>`;

		this.colourList = 
			['rgb(26, 188, 156)','rgb(46, 204, 113)','rgb(52, 152, 219)','rgb(155, 89, 182)','rgb(233, 30, 99)','rgb(241, 196, 15)','rgb(230, 126, 34)','rgb(231, 76, 60)','rgb(149, 165, 166)','rgb(96, 125, 139)','rgb(99, 99, 99)',
			'rgb(255, 255, 255)','rgb(17, 128, 106)','rgb(31, 139, 76)','rgb(32, 102, 148)','rgb(113, 54, 138)','rgb(173, 20, 87)','rgb(194, 124, 14)','rgb(168, 67, 0)','rgb(153, 45, 34)','rgb(151, 156, 159)','rgb(84, 110, 122)','rgb(44, 44, 44)'];
	}

	getName () {return "EditChannels";}

	getDescription () {return "Allows you to rename and recolor channelnames.";}

	getVersion () {return "2.0.0";}

	getAuthor () {return "DevilBro";}

	//legacy
	load () {}

	start () {
		this.channelObserver = new MutationObserver((changes, _) => {
			changes.forEach(
				(change, i) => {
					if (change.attributeName == "class" && change.target && change.target.classList && change.target.classList.contains("name-2SL4ev")) {
						this.loadChannel(change.target);
					}
					if (change.addedNodes) {
						change.addedNodes.forEach((node) => {
							if (node.classList && node.classList.contains("containerDefault-7RImuF")) {
								this.loadChannel($(node).find(".name-2SL4ev")[0]);
							}
						});
					}
				}
			);
		});
		
		this.channelListObserver = new MutationObserver((changes, _) => {
			changes.forEach(
				(change, i) => {
					if (change.addedNodes) {
						change.addedNodes.forEach((node) => {
							 if (node && node.className && node.className.length > 0 && node.className.indexOf("container-") > -1) {
								this.channelObserver.observe(node, {childList: true, attributes: true, subtree: true});
								this.loadAllChannels();
							} 
						});
					}
				}
			);
		});
		this.channelListObserver.observe($(".flex-vertical.channels-wrap")[0], {childList: true, subtree: true});
		
		$(".flex-vertical.channels-wrap .scroller-fzNley.scroller-NXV0-d [class^='container-']").each(
			(i,category) => {
				this.channelObserver.observe(category, {childList: true, attributes: true, subtree: true});
			}
		);
		
		this.channelContextObserver = new MutationObserver((changes, _) => {
			changes.forEach(
				(change, i) => {
					if (change.addedNodes) {
						change.addedNodes.forEach((node) => {
							if (node.nodeType == 1 && node.className.includes("context-menu")) {
								this.onContextMenu(node);
							}
						});
					}
				}
			);
		});
		this.channelContextObserver.observe($("#app-mount>:first-child")[0], {childList: true});
		
		$('head').append(this.css)
			.append("<script src='https://bgrins.github.io/spectrum/spectrum.js'></script>")
			.append("<link rel='stylesheet' href='https://bgrins.github.io/spectrum/spectrum.css' />");
		
		this.loadAllChannels();
								
		var that = this;
		setTimeout(function() {
			that.labels = that.setLabelsByLanguage();
			that.changeLanguageStrings();
		},5000);
	}

	stop () {
		this.channelObserver.disconnect();
		this.channelListObserver.disconnect();
		this.channelContextObserver.disconnect();
		$(".editchannels").remove();
	}

	
	// begin of own functions

	getReactInstance (node) { 
		return node[Object.keys(node).find((key) => key.startsWith("__reactInternalInstance"))];
	}

	getReactObject (node) { 
		return ((inst) => (inst._currentElement._owner._instance))(this.getReactInstance(node));
	}

	changeLanguageStrings () {
		this.channelContextEntryMarkup = 	this.channelContextEntryMarkup.replace("REPLACE_context_localsettings_text", this.labels.context_localsettings_text);
		
		this.channelContextSubMenuMarkup = 	this.channelContextSubMenuMarkup.replace("REPLACE_submenu_channelsettings_text", this.labels.submenu_channelsettings_text);
		this.channelContextSubMenuMarkup = 	this.channelContextSubMenuMarkup.replace("REPLACE_submenu_resetsettings_text", this.labels.submenu_resetsettings_text);
		
		this.channelSettingsModalMarkup = 	this.channelSettingsModalMarkup.replace("REPLACE_modal_header_text", this.labels.modal_header_text);
		this.channelSettingsModalMarkup = 	this.channelSettingsModalMarkup.replace("REPLACE_modal_channelname_text", this.labels.modal_channelname_text);
		this.channelSettingsModalMarkup = 	this.channelSettingsModalMarkup.replace("REPLACE_modal_colorpicker1_text", this.labels.modal_colorpicker1_text);
		this.channelSettingsModalMarkup = 	this.channelSettingsModalMarkup.replace("REPLACE_btn_cancel_text", this.labels.btn_cancel_text);
		this.channelSettingsModalMarkup = 	this.channelSettingsModalMarkup.replace("REPLACE_btn_save_text", this.labels.btn_save_text);
	}
	
	onContextMenu (context) {
		var inst = this.getReactInstance(context);
		if (!inst) return;
		var ele = inst._currentElement;
		if (ele.props && ele.props.children) {
			var children = Array.isArray(ele.props.children) ? ele.props.children : [ele.props.children];
			for (var i = 0; i < children.length; i++) {
				if (children[i] && children[i].props && children[i].props.channel && children[i].type && children[i].type.displayName == "ChannelInviteCreateGroup") {
					var { id, guild_id, name } = children[i].props.channel;
					var data = { id, guild_id, name };
					$(context).append(this.channelContextEntryMarkup)
						.on("mouseenter", ".localsettings-item", data, this.createContextSubMenu.bind(this))
						.on("mouseleave", ".localsettings-item", data, this.deleteContextSubMenu.bind(this));
					break;
				}
			}
		}
	}
	
	createContextSubMenu (e) {
		var { id, guild_id, name } = e.data;
		var data = { id, guild_id, name };
		
		var theme = this.themeIsLightTheme() ? "" : "theme-dark";
		
		var targetDiv = e.target.tagName != "SPAN" ? e.target : e.target.parentNode;
		
		var channelContextSubMenu = $(this.channelContextSubMenuMarkup);
		$(targetDiv).append(channelContextSubMenu)
			.off("click", ".channelsettings-item")
			.on("click", ".channelsettings-item", data, this.showChannelSettings.bind(this));
		$(channelContextSubMenu)
			.addClass(theme)
			.css("left", $(targetDiv).offset().left + "px")
			.css("top", $(targetDiv).offset().top + "px");
			
		var settings = this.loadSettings(e.data.id + "_" + e.data.guild_id);
		if (!settings.nickName && !settings.color) {
			$(targetDiv).find(".resetsettings-item").addClass("disabled");
		}
		else {
			$(targetDiv)
				.off("click", ".resetsettings-item")
				.on("click", ".resetsettings-item", data, this.resetChannel.bind(this));
		}
	}
	
	deleteContextSubMenu (e) {
		$(".localChannelSettingsSubMenu").hide();
	}
	
	showChannelSettings (e) {
		$(".context-menu").hide();
		var id = e.data.id + "_" + e.data.guild_id;
		if (id) {
			var channelID, serverID, nickName, color;
			var settings = this.loadSettings(id);
			if (settings) {
				channelID = 	settings.channelID;
				serverID = 		settings.serverID;
				nickName = 		settings.nickName;
				color = 		settings.color;
				
				var channel = this.getDivOfChannel(channelID, serverID);
				
				var channelSettingsModal = $(this.channelSettingsModalMarkup);
				channelSettingsModal.find("#modal-text")[0].value = nickName;
				this.setSwatches(color, this.colourList, channelSettingsModal.find(".swatches1"));
				channelSettingsModal.appendTo("#app-mount")
					.on("click", ".callout-backdrop,button.btn-cancel", (event) => {
						channelSettingsModal.remove();
					})
					.on("submit", "form", (event) => {
						event.preventDefault();
						if (channelSettingsModal.find("#modal-text")[0].value) {
							if (channelSettingsModal.find("#modal-text")[0].value.trim().length > 0) {
								nickName = channelSettingsModal.find("#modal-text")[0].value.trim();
							}
							else {
								nickName = null;
							}
						}
						else {
							nickName = null;
						}
						
						if (!$(".ui-color-picker-swatch1.nocolor.selected")[0]) {
							var colorRGB = $(".ui-color-picker-swatch1.selected").css("backgroundColor");
							var color = colorRGB.slice(4, -1).split(", ").map(Number);
							color = (color[0] < 30 && color[1] < 30 && color[2] < 30) ? 
									[color[0]+30, color[1]+30, color[2]+30] : 
									[color[0], color[1], color[2]];
							color = (color[0] > 225 && color[1] > 225 && color[2] > 225) ? 
									[color[0]-30, color[1]-30, color[2]-30] : 
									[color[0], color[1], color[2]];
						} 
						else {
							color = null;
						}
						
							
						this.saveSettings(id, {channelID,serverID,nickName,color});
							
						this.loadChannel(channel);
						
						channelSettingsModal.remove();
					});
					
				channelSettingsModal.find("#modal-text")[0].focus();
			}
		}
	}

	setSwatches (currentCOMP, colorOptions, wrapper) {
		var wrapperDiv = $(wrapper);
			
		var swatches = 
			`<div class="ui-flex flex-horizontal flex-justify-start flex-align-stretch flex-nowrap" style="flex: 1 1 auto; margin-top: 5px;">
				<div class="ui-color-picker-swatch1 large custom" style="background-color: rgb(0, 0, 0);"></div>
				<div class="regulars ui-flex flex-horizontal flex-justify-start flex-align-stretch flex-wrap ui-color-picker-row" style="flex: 1 1 auto; display: flex; flex-wrap: wrap; overflow: visible !important;"><div class="ui-color-picker-swatch1 nocolor">✖</div>
					${ colorOptions.map((val, i) => `<div class="ui-color-picker-swatch1" style="background-color: ${val};"></div>`).join("")}
				</div>
			</div>`;
		$(swatches).appendTo(wrapperDiv);
		
		if (currentCOMP) {
			var currentRGB = "rgb(" + (currentCOMP[0]) + ", " + (currentCOMP[1]) + ", " + (currentCOMP[2]) + ")";
			var currentHex = '#' + (0x1000000 + (currentCOMP[2] | (currentCOMP[1] << 8) | (currentCOMP[0] << 16))).toString(16).slice(1);
			
			var invColor = "rgb(" + (255-currentCOMP[0]) + ", " + (255-currentCOMP[1]) + ", " + (255-currentCOMP[2]) + ")";
			
			var selection = colorOptions.indexOf(currentRGB);
			
			if (selection > -1) {
				wrapperDiv.find(".regulars .ui-color-picker-swatch1").eq(selection+1)
					.addClass("selected")
					.css("background-color", currentRGB)
					.css("border", "4px solid " + invColor);
			} 
			else {
				$(".custom", wrapperDiv)
					.addClass("selected")
					.css("background-color", currentRGB)
					.css("border", "4px solid " + invColor);
			}
		}
		else {
			$(".nocolor", wrapperDiv)
				.addClass("selected")
				.css("border", "4px solid black");
		}
		
		wrapperDiv.on("click", ".ui-color-picker-swatch1:not(.custom)", (e) => {
			var tempColor = $(e.target).css("background-color").slice(4, -1).split(", ");
			var newInvColor = e.target.classList.contains("nocolor") ? "black" : "rgb(" + (255-tempColor[0]) + ", " + (255-tempColor[1]) + ", " + (255-tempColor[2]) + ")";
			
			wrapperDiv.find(".ui-color-picker-swatch1.selected")
				.removeClass("selected")
				.css("border", "");
			
			$(e.target)
				.addClass("selected")
				.css("border", "4px solid " + newInvColor);
		})
		var custom = $(".ui-color-picker-swatch1.custom", wrapperDiv).spectrum({
			color: $(".custom", wrapperDiv).css("background-color"),
			preferredFormat: "rgb",
			clickoutFiresChange: true,
			showInput: true,
			showButtons: false,
			move: (color) => {
				var tempColor = color.toRgbString().slice(4, -1).split(", ");
				var newInvColor = "rgb(" + (255-tempColor[0]) + ", " + (255-tempColor[1]) + ", " + (255-tempColor[2]) + ")";
				
				$(".ui-color-picker-swatch1.selected.nocolor")
					.removeClass("selected")
					.css("border", "4px solid red");
					
				$(".ui-color-picker-swatch1.selected")
					.removeClass("selected")
					.css("border", "4px solid transparent");
				
				custom
					.addClass("selected")
					.css("background-color", color.toRgbString())
					.css("border", "4px solid " + newInvColor);
			}
		});
	}
	
	chooseColor (channel, colorCOMP) {
		if (colorCOMP && channel && channel.className) {
			if (channel.className.indexOf("nameMuted") > -1 || channel.className.indexOf("nameLocked") > -1) {
				return "rgb(" + (colorCOMP[0]-50) + ", " + (colorCOMP[1]-50) + ", " + (colorCOMP[2]-50) + ")";
			}
			if (channel.className.indexOf("nameDefault") > -1) {
				return "rgb(" + (colorCOMP[0]) + ", " + (colorCOMP[1]) + ", " + (colorCOMP[2]) + ")";
			}
			if (channel.className.indexOf("nameSelected") > -1 || channel.className.indexOf("nameHovered") > -1 ||  channel.className.indexOf("nameUnread") > -1) {
				return "rgb(" + (colorCOMP[0]+50) + ", " + (colorCOMP[1]+50) + ", " + (colorCOMP[2]+50) + ")";
			}
		}
		return null;
	}
	
	resetChannel (e) {
		$(".context-menu").hide();
		
		var id = e.data.id + "_" + e.data.guild_id;
		if (id) {
			var channel = this.getDivOfChannel(e.data.id, e.data.guild_id);
			
			$(channel).text(e.data.name);
			$(channel).css("color", "");
			
			this.clearSettings(id);
		}
	}
	
	loadChannel (channel) {
		var data = this.getChannelInformation(channel);
		if (data) {
			var channelID, serverID, nickName, color;
			var settings = this.loadSettings(data.channelID + "_" + data.serverID);
			if (settings) {
				channelID = 	settings.channelID;
				serverID = 		settings.serverID;
				nickName = 		settings.nickName;
				color = 		settings.color;
				
				var colorRGB = this.chooseColor(channel, color);
				
				nickName ? $(channel).text(nickName) : $(channel).text(data.origName);
				colorRGB ? $(channel).css("color", colorRGB) : $(channel).css("color", "");
			}
			else {
				this.clearSettings(data.channelID + "_" + data.serverID);
			}
		}
	}
	
	loadAllChannels () {
		var channels = this.readChannelList();
		for (var i = 0; i < channels.length; i++) {
			this.loadChannel(channels[i]);
		}
	}
	
	readChannelList () {
		var foundChannels = [];
		$(".name-2SL4ev").each(
			(i,channel) => {
				foundChannels.push(channel);
			}
		);
		return foundChannels;
	}
	
	getChannelInformation (channel) {
		var inst = this.getReactInstance(channel.parentElement);
		if (!inst) return null;
		var curEle = inst._currentElement;
		if (curEle && curEle._owner && curEle._owner._instance && curEle._owner._instance.props && curEle._owner._instance.props.channel) {
			var channelID = curEle._owner._instance.props.channel.id;
			var serverID = curEle._owner._instance.props.channel.guild_id;
			var origName = curEle._owner._instance.props.channel.name;
			var data = {channelID, serverID, origName}
			return data;
		}
		else {
			return null;
		}
	}
	
	getDivOfChannel (channelID, serverID) {
		var channels = this.readChannelList();
		for (var i = 0; i < channels.length; i++) {
			var data = this.getChannelInformation(channels[i]);
			if (data) {
				if (channelID == data.channelID && serverID == data.serverID) {
					return channels[i];
				}
			}
		}
		return null;
	}
	
	themeIsLightTheme () {
		if ($(".theme-light").length > $(".theme-dark").length) {
			return true;
		}
		else {
			return false;
		}
	}
	
	saveSettings (id, settings) {
		bdPluginStorage.set(this.getName(), id, JSON.stringify(settings));
	}

	loadSettings (id) {
		return JSON.parse(bdPluginStorage.get(this.getName(), id));
	}
	
	clearSettings (id) {
		var channelID = 	id.split("_")[0];
		var serverID = 		id.split("_")[1];
		var nickName = 		null;
		var color = 		null;
		this.saveSettings(id, {channelID,serverID,nickName,color});
	}
	
	setLabelsByLanguage () {
		switch (document.getElementsByTagName("html")[0].lang.split("-")[0]) {
			case "da": 		//danish
				return {
					context_localsettings_text: 		"Lokal Kanalindstillinger",
					submenu_channelsettings_text: 		"Skift indstillinger",
					submenu_resetsettings_text: 		"Nulstil kanal",
					modal_header_text:					"Lokal Kanalindstillinger",
					modal_channelname_text:				"Lokalt kanalnavn",
					modal_colorpicker1_text:			"Lokal kanalfarve",
					btn_cancel_text:					"Afbryde",
					btn_save_text:						"Spare"
				};
			case "de": 		//german
				return {
					context_localsettings_text: 		"Lokale Kanaleinstellungen",
					submenu_channelsettings_text: 		"Ändere Einstellungen",
					submenu_resetsettings_text: 		"Kanal zurücksetzen",
					modal_header_text:					"Lokale Kanaleinstellungen",
					modal_channelname_text:				"Lokaler Kanalname",
					modal_colorpicker1_text:			"Lokale Kanalfarbe",
					btn_cancel_text:					"Abbrechen",
					btn_save_text:						"Speichern"
				};
			case "es": 		//spanish
				return {
					context_localsettings_text: 		"Ajustes local de canal",
					submenu_channelsettings_text: 		"Cambiar ajustes",
					submenu_resetsettings_text: 		"Restablecer canal",
					modal_header_text:					"Ajustes local de canal",
					modal_channelname_text:				"Nombre local del canal",
					modal_colorpicker1_text:			"Color local del canal",
					btn_cancel_text:					"Cancelar",
					btn_save_text:						"Guardar"
				};
			case "fr": 		//french
				return {
					context_localsettings_text: 		"Paramètres locale du canal",
					submenu_channelsettings_text: 		"Modifier les paramètres",
					submenu_resetsettings_text: 		"Réinitialiser le canal",
					modal_header_text:					"Paramètres locale du canal",
					modal_channelname_text:				"Nom local du canal",
					modal_colorpicker1_text:			"Couleur locale de la chaîne",
					btn_cancel_text:					"Abandonner",
					btn_save_text:						"Enregistrer"
				};
			case "it": 		//italian
				return {
					context_localsettings_text: 		"Impostazioni locale canale",
					submenu_channelsettings_text: 		"Cambia impostazioni",
					submenu_resetsettings_text: 		"Ripristina canale",
					modal_header_text:					"Impostazioni locale canale",
					modal_channelname_text:				"Nome locale canale",
					modal_colorpicker1_text:			"Colore locale canale",
					btn_cancel_text:					"Cancellare",
					btn_save_text:						"Salvare"
				};
			case "nl":		//dutch
				return {
					context_localsettings_text: 		"Lokale kanaalinstellingen",
					submenu_channelsettings_text: 		"Verandere instellingen",
					submenu_resetsettings_text: 		"Reset kanaal",
					modal_header_text:					"Lokale kanaalinstellingen",
					modal_channelname_text:				"Lokale kanaalnaam",
					modal_colorpicker1_text:			"Lokale kanaalkleur",
					btn_cancel_text:					"Afbreken",
					btn_save_text:						"Opslaan"
				};
			case "no":		//norwegian
				return {
					context_localsettings_text: 		"Lokal kanalinnstillinger",
					submenu_channelsettings_text: 		"Endre innstillinger",
					submenu_resetsettings_text: 		"Tilbakestill kanal",
					modal_header_text:					"Lokal kanalinnstillinger",
					modal_channelname_text:				"Lokalt kanalnavn",
					modal_colorpicker1_text:			"Lokal kanalfarge",
					btn_cancel_text:					"Avbryte",
					btn_save_text:						"Lagre"
				};
			case "pl":		//polish
				return {
					context_localsettings_text: 		"Lokalny ustawienia kanału",
					submenu_channelsettings_text: 		"Zmień ustawienia",
					submenu_resetsettings_text: 		"Resetuj kanał",
					modal_header_text:					"Lokalny ustawienia kanału",
					modal_channelname_text:				"Lokalna nazwa kanału",
					modal_colorpicker1_text:			"Lokalny kolor kanału",
					btn_cancel_text:					"Anuluj",
					btn_save_text:						"Zapisz"
				};
			case "pt":		//portuguese (brazil)
				return {
					context_localsettings_text: 		"Configurações local do canal",
					submenu_channelsettings_text: 		"Mudar configurações",
					submenu_resetsettings_text: 		"Redefinir canal",
					modal_header_text:					"Configurações local do canal",
					modal_channelname_text:				"Nome local do canal",
					modal_colorpicker1_text:			"Cor local do canal",
					btn_cancel_text:					"Cancelar",
					btn_save_text:						"Salvar"
				};
			case "fi":		//finnish
				return {
					context_localsettings_text: 		"Paikallinen kanavan asetukset",
					submenu_channelsettings_text: 		"Vaihda asetuksia",
					submenu_resetsettings_text: 		"Nollaa kanava",
					modal_header_text:					"Paikallinen kanavan asetukset",
					modal_channelname_text:				"Paikallinen kanavanimi",
					modal_colorpicker1_text:			"Paikallinen kanavanväri",
					btn_cancel_text:					"Peruuttaa",
					btn_save_text:						"Tallentaa"
				};
			case "sv":		//swedish
				return {
					context_localsettings_text: 		"Lokal kanalinställningar",
					submenu_channelsettings_text: 		"Ändra inställningar",
					submenu_resetsettings_text: 		"Återställ kanal",
					modal_header_text:					"Lokal kanalinställningar",
					modal_channelname_text:				"Lokalt kanalnamn",
					modal_colorpicker1_text:			"Lokal kanalfärg",
					btn_cancel_text:					"Avbryta",
					btn_save_text:						"Spara"
				};
			case "tr":		//turkish
				return {
					context_localsettings_text: 		"Yerel Kanal Ayarları",
					submenu_channelsettings_text: 		"Ayarları Değiştir",
					submenu_resetsettings_text: 		"Kanal Sıfırla",
					modal_header_text:					"Yerel Kanal Ayarları",
					modal_channelname_text:				"Yerel Kanal Adı",
					modal_colorpicker1_text:			"Yerel Kanal Rengi",
					btn_cancel_text:					"Iptal",
					btn_save_text:						"Kayıt"
				};
			case "cs":		//czech
				return {
					context_localsettings_text: 		"Místní nastavení kanálu",
					submenu_channelsettings_text: 		"Změnit nastavení",
					submenu_resetsettings_text: 		"Obnovit kanál",
					modal_header_text:					"Místní nastavení kanálu",
					modal_channelname_text:				"Místní název kanálu",
					modal_colorpicker1_text:			"Místní barvy kanálu",
					btn_cancel_text:					"Zrušení",
					btn_save_text:						"Uložit"
				};
			case "bg":		//bulgarian
				return {
					context_localsettings_text: 		"Настройки за локални канали",
					submenu_channelsettings_text: 		"Промяна на настройките",
					submenu_resetsettings_text: 		"Възстановяване на канал",
					modal_header_text:					"Настройки за локални канали",
					modal_channelname_text:				"Локално име на канал",
					modal_colorpicker1_text:			"Локален цветен канал",
					btn_cancel_text:					"Зъбести",
					btn_save_text:						"Cпасяване"
				};
			case "ru":		//russian
				return {
					context_localsettings_text: 		"Настройки локального канала",
					submenu_channelsettings_text: 		"Изменить настройки",
					submenu_resetsettings_text: 		"Сбросить канал",
					modal_header_text:					"Настройки локального канала",
					modal_channelname_text:				"Имя локального канала",
					modal_colorpicker1_text:			"Цвет локального канала",
					btn_cancel_text:					"Отмена",
					btn_save_text:						"Cпасти"
				};
			case "uk":		//ukranian
				return {
					context_localsettings_text: 		"Налаштування локального каналу",
					submenu_channelsettings_text: 		"Змінити налаштування",
					submenu_resetsettings_text: 		"Скидання каналу",
					modal_header_text:					"Налаштування локального каналу",
					modal_channelname_text:				"Локальне ім'я каналу",
					modal_colorpicker1_text:			"Колір місцевого каналу",
					btn_cancel_text:					"Скасувати",
					btn_save_text:						"Зберегти"
				};
			case "ja":		//japanese
				return {
					context_localsettings_text: 		"ローカルチャネル設定",
					submenu_channelsettings_text: 		"設定を変更する",
					submenu_resetsettings_text: 		"チャネルをリセットする",
					modal_header_text:					"ローカルチャネル設定",
					modal_channelname_text:				"ローカルチャネル名",
					modal_colorpicker1_text:			"ローカルチャネルの色",
					btn_cancel_text:					"キャンセル",
					btn_save_text:						"セーブ"
				};
			case "zh":		//chinese (traditional)
				return {
					context_localsettings_text: 		"本地頻道設置",
					submenu_channelsettings_text: 		"更改設置",
					submenu_resetsettings_text: 		"重置通道",
					modal_header_text:					"本地頻道設置",
					modal_channelname_text:				"本地頻道名稱",
					modal_colorpicker1_text:			"本地頻道顏色",
					btn_cancel_text:					"取消",
					btn_save_text:						"保存"
				};
			case "ko":		//korean
				return {
					context_localsettings_text: 		"로컬 채널 설정",
					submenu_channelsettings_text: 		"설정 변경",
					submenu_resetsettings_text: 		"채널 재설정",
					modal_header_text:					"로컬 채널 설정",
					modal_channelname_text:				"로컬 채널 이름",
					modal_colorpicker1_text:			"지역 채널 색상",
					btn_cancel_text:					"취소",
					btn_save_text:						"저장"
				};
			default:		//default: english
				return {
					context_localsettings_text: 		"Local Channelsettings",
					submenu_channelsettings_text: 		"Change Settings",
					submenu_resetsettings_text: 		"Reset Channel",
					modal_header_text:					"Local Channelsettings",
					modal_channelname_text:				"Local Channelname",
					modal_colorpicker1_text:			"Local Channelcolor",
					btn_cancel_text:					"Cancel",
					btn_save_text:						"Save"
				};
		}
	}
}
