wanthaver.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        CURRENT_LOCATION: 'Current Location',
        BIDDING: 'Bidding',
        CUSTOM_LOCATION: 'Custom Location',
        CANCEL: 'Cancel',
        IMAGE: 'Image',

        /** MENU **/
        MENU_ALL_DESIRES: 'All Desires',
        MENU_MY_DESIRE: 'My Desires',
        MENU_MY_TRANSACTIONS: 'My Transactions',
        MENU_CREATE_DESIRE: 'CREATE DESIRE',
        MENU_SETTINGS: 'Settings',
        MENU_LOGOUT: 'Logout',
        MENU_ABOUT: 'About',

        /** CHAT **/
        CHAT_YOUR_MESSAGE: 'Your Message...',

        /** SETTINGS**/
        SETTINGS_NAME: 'Name',
        SETTINGS_EMAIL: 'Email',
        SETTINGS_PWRESET_TITLE: 'Password Reset',
        SETTINGS_PWRESET_MESSAGE:'You will get an email to reset your password.',
        SETTINGS_PWRESET_BUTTON:'Reset my Password',
        SETTINGS_PWRESET_POPUP_TITLE: 'Password reset mail',
        SETTINGS_PWRESET_POPUP_TEXT: 'Password reset mail was sent successfully!',
        SETTINGS_PWRESET_POPUP_TEXT_FAILED: 'Sending password reset mail failed!',
        SETTINGS_SAVE_BUTTON:'Save Changes',
        SETTINGS_SAVE_POPUPFAIL: 'An error occurred while saving your changes.',
        SETTINGS_SAVE_POPUPSUCCESS: 'Saved your changes successfully!',

        /** DESIRE CREATE**/
        DESIRECREATE_BAR_TITLE1: 'Step 1',
        DESIRECREATE_BAR_TITLE2: 'Step 2',
        DESIRECREATE_BAR_TITLE3: 'Step 3',
        DESIRECREATE_TITLE: 'Titel',
        DESIRECREATE_DESCRIPTION: 'Description',
        DESIRECREATE_DESCRIPTION_PLACEGOLDER: 'Description (max 300 Characters)',
        DESIRECREATE_DATE: 'Expiration Date',
        DESIRECREATE_PRICE: 'Price',
        DESIRECREATE_CATEGORY: 'Select a Category',
        DESIRECREATE_CATEGORY_CHANGE: '(Tap to change)',
        DESIRECREATE_EXPIRE: 'Desire should expire in',
        DESIRECREATE_EXPIRE_DAYS:'Set in Days',
        DESIRECREATE_EXPIRE_HOURS: 'Set in Hours',
        DESIRECREATE_DIFFERENT_LOCATION: 'Choose Location on Map',
        DESIRECREATE_PUBLISH: 'Publish',
        DESIRECREATE_LOCATION_HEADER: 'Select Dropzone',
        DESIRECREATE_NO_LOCATIONS: "You don't have any saved locations.",
        DESIRECREATE_TAP_CHANGE_IMAGE: 'Tap to change image',
        DESIRECREATE_REVERSEDBIDDING_POPUP_TITLE: 'About Reversed Bidding in WantHaver',
        DESIRECREATE_REVERSEDBIDDING_POPUP_TEXT: 'Reversed Bidding text ...//TODO. For further infromation also see: www.wanthaver.com',
        DESIRECREATE_REVERSE_BIDDING: 'Reverse Bidding',
        DESIRECREATE_REVERSE_BIDDING_DESC: 'This means that Havers must suggest a price.',
        DESIRECREATE_MISSING_INPUT_TITLE: 'Error Creating a Desire!',
        DESIRECREATE_MISSING_INPUT_TEXT_TITLE: 'Please Enter a Title',
        DESIRECREATE_MISSING_INPUT_TEXT_DESCRIPTION: 'Please Select a Description',
        DESIRECREATE_MISSING_INPUT_TEXT_PRICE: 'Please Select a Price',
        DESIRECREATE_MISSING_INPUT_TEXT_CATEGORY: 'Please Select a Category',
        DESIRECREATE_MISSING_INPUT_TEXT_DROPZONE: 'Please Select a Dropzone',
        DESIRECREATE_EXPIRE_INPUT_DAY: "day",
        DESIRECREATE_EXPIRE_INPUT_DAYS: "days",
        DESIRECREATE_EXPIRE_INPUT_WEEK: "week",
        DESIRECREATE_EXPIRE_INPUT_WEEKS: "weeks",
        DESIRECREATE_EXPIRE_INPUT_HOUR: "hour",
        DESIRECREATE_EXPIRE_INPUT_HOURS: "hours",



        /** DESIRE DETAIL **/
        DESIREDETAIL_BAR_TITLE: 'Desire',
        DESIREDETAIL_DESCRIPTION: 'Description',
        DESIREDETAIL_PRICE: 'Price',
        DESIREDETAIL_LOCATION: 'Location',
        DESIREDETAIL_HAVER: 'Haver',
        DESIREDETAIL_HAVER_ACCEPTED: 'Accepted Haver',
        DESIREDETAIL_NO_HAVER: 'Unfortunately there are no havers yet',
        DESIRE_DETAIL_HAVER_UNACCEPT_POPUP_TITLE: 'Cancel desire?',
        DESIRE_DETAIL_HAVER_UNACCEPT_POPUP_SUBTITLE: 'Do you really want to cancel this desire?',
        DESIRE_DETAIL_HAVER_UNACCEPT_POPUP_WARNING: 'Do you really want to cancel this desire? You are an accepted haver. \n(Attention: You will be flagged for cancelling transactions as accepted haver!)',
        DESIRE_DETAIL_DELETION_POPUP_TITLE: 'Delete Desire',
        DESIRE_DETAIL_DELETION_POPUP_SUBTITLE: 'Do you really want to delete this desire?',
        DESIRE_DETAIL_WANTER_UNACCEPT_POPUP_TITLE: 'Cancel desire?',
        DESIRE_DETAIL_WANTER_UNACCEPT_POPUP_SUBTITLE: 'Do you really want to cancel this desire? You have already accepted a haver.',
        DESIRE_DETAIL_SUBMIT: 'Submit',
        DESIRE_DETAIL_CANCEL: 'Cancel',
        DESIRE_DETAIL_REPORT_TITLE: 'Report Desire',
        DESIRE_DETAIL_REPORT_REASON: 'Reason',
        DESIRE_DETAIL_REPORT_REASON_1: 'Inappropriate',
        DESIRE_DETAIL_REPORT_REASON_2: 'Impossible',
        DESIRE_DETAIL_REPORT_REASON_3: 'Spam',
        DESIRE_DETAIL_COMMENT: 'Leave a comment',
        DESIREDETAIL_BID: 'Your bid',
        DESIRE_DETAIL_REV_BIDDING_TITLE: 'Accept desire',
        DESIRE_DETAIL_REV_BIDDING_SUBTITLE: 'Make your bid',
        DESIRE_DETAIL_REV_BIDDING_MODIFY_TITLE: 'Modify your bid',
        DESIRE_DETAIL_RATE_WANTER: 'Rate Creator',
        DESIRE_DETAIL_REGISTERED: "You're registered as Haver! You will get notified as soon as the creator accepts you.",
        DESIRE_DETAIL_ACCEPTEDHAVER: "Congratulations, you've been accepted by the creator.",
        DESIRE_DETAIL_FINISH_INFO: "Has your Desire been fulfilled?",
        DESIRE_DETAIL_FINISH: "Finish Desire",

        /** RATING **/
        RATING_BAR_TITLE: 'Rating',
        RATING_SUBTITLE: 'Your transaction',
        RATING_SUMMARY: 'Transaction summary',
        RATING_TITLE: 'Your Rating',
        RATING_POPUP_TITLE: 'Rating not finished!',
        RATING_POPUP_SUBTITLE: 'You have to rate with at least one star',

        /** FILTER SETTING **/
        FILTERSETTING_TITLE: 'Change Filter',
        FILTERSETTING_CATEGORY: 'Category',
        FILTERSETTING_MINPRICE: 'Minimum price',
        FILTERSETTING_MAXPRICE: 'Maximum price',
        FILTERSETTING_MINRATING: 'Minimum Rating',
        FILTERSETTING_APPLY: 'Apply Filter',
        FILTERSETTING_RESET: 'Reset Filter',
        FILTERSETTING_RADIUS: 'Distance Radius',
        FILTERSETTING_LOCATION: 'Location',

        /** CATEGORY_LIST **/
        CATEGORYLIST_TITLE: 'Select a Category',
        CATEGORYLIST_CANCEL: 'Cancel',

        /** MAP **/
        MAP_PROMPT_TITLE: 'Enter Custom Location',
        MAP_BUTTON: 'Set As Location',
        MAP_TITLE: 'Choose a Location',
        MAP_CLOSE_BUTTON: 'Cancel',

        /** ABOUT **/
        ABOUT_WEBSITE: 'Our Website www.wanthaver.com',
        ABOUT_AGB: 'Terms of Use',
        ABOUT_LICENSES: 'Software-Licenses'
    });
    $translateProvider.translations('de', {
        CURRENT_LOCATION: 'Momentaner Standort',
        BIDDING: 'Bieten',
        CUSTOM_LOCATION: 'Benutzerdefinierter Ort',
        CANCEL: 'Abbrechen',
        IMAGE: 'Bild',

        /** MENU **/
        MENU_ALL_DESIRES: 'Alle Aufträge',
        MENU_MY_DESIRE: 'Meine Aufträge',
        MENU_MY_TRANSACTIONS: 'Meine Transaktionen',
        MENU_CREATE_DESIRE: 'Neuer Auftrag',
        MENU_SETTINGS: 'Einstellungen',
        MENU_LOGOUT: 'Ausloggen',
        MENU_ABOUT: 'Über uns',


        /** CHAT **/
        CHAT_YOUR_MESSAGE: 'Deine Nachricht...',


        /** SETTINGS**/
        SETTINGS_NAME: 'Name',
        SETTINGS_EMAIL: 'Email',
        SETTINGS_PWRESET_TITLE: 'Passwort-Zurücksetzen',
        SETTINGS_PWRESET_MESSAGE:'Du erhältst eine E-Mail zum Ändern des Passworts.',
        SETTINGS_SAVE_BUTTON:'Änderungen übernehmen',
        SETTINGS_PWRESET_BUTTON:'Mein Passwort zurücksetzen',
        SETTINGS_PWRESET_POPUP_TITLE: 'Passwort-Zurücksetzen E-Mail',
        SETTINGS_PWRESET_POPUP_TEXT: 'Du erhältst eine E-Mail zum Ändern des Passworts',
        SETTINGS_PWRESET_POPUP_TEXT_FAILED: 'E-Mail zum Zurücksetzen des Passwortes ist fehlgeschlagen!',
        SETTINGS_SAVE_POPUPFAIL: 'Beim Speichern deiner Änderungen ist ein Fehler aufgetreten!',
        SETTINGS_SAVE_POPUPSUCCESS: 'Deine Änderungen wurden erfolgreich gespeichert.',

        /** DESIRE CREATE**/
        DESIRECREATE_BAR_TITLE1: 'Schritt 1',
        DESIRECREATE_BAR_TITLE2: 'Schritt 2',
        DESIRECREATE_BAR_TITLE3: 'Letzter Schritt',
        DESIRECREATE_TITLE: 'Titel',
        DESIRECREATE_DESCRIPTION: 'Beschreibung',
        DESIRECREATE_DESCRIPTION_PLACEGOLDER: 'Beschreibung (max 300 Zeichen)',
        DESIRECREATE_DATE: 'Ablaufdatum',
        DESIRECREATE_PRICE: 'Preis',
        DESIRECREATE_CATEGORY: 'Wähle eine Kategorie',
        DESIRECREATE_CATEGORY_CHANGE: '(tippen um zu ändern)',
        DESIRECREATE_EXPIRE: 'Auftrag läuft ab in',
        DESIRECREATE_EXPIRE_DAYS:'Tage wählen',
        DESIRECREATE_EXPIRE_HOURS: 'Stunden wählen',
        DESIRECREATE_DIFFERENT_LOCATION: 'Ort auf Karte auswählen',
        DESIRECREATE_PUBLISH: 'Veröffentlichen',
        DESIRECREATE_LOCATION_HEADER: 'Dropzone auswählen',
        DESIRECREATE_NO_LOCATIONS: "Du hast noch keine gespeicherten Orte.",
        DESIRECREATE_TAP_CHANGE_IMAGE: 'Tippe um ein anderes Bild zu wählen',
        DESIRECREATE_REVERSEDBIDDING_POPUP_TITLE: 'Über Reversed Bidding in WantHaver',
        DESIRECREATE_REVERSEDBIDDING_POPUP_TEXT: 'Reversed Bidding text ...//TODO. Für weite Informationen siehe: www.wanthaver.com',
        DESIRECREATE_REVERSE_BIDDING: 'Bieten',
        DESIRECREATE_REVERSE_BIDDING_DESC: 'Haver müssen einen Preis vorschlagen.',
        DESIRECREATE_MISSING_INPUT_TITLE: 'Desire konnte nicht erstellt werden!',
        DESIRECREATE_MISSING_INPUT_TEXT_TITLE: 'Gib einen Titel an',
        DESIRECREATE_MISSING_INPUT_TEXT_DESCRIPTION: 'Gib eine Beschreibung an',
        DESIRECREATE_MISSING_INPUT_TEXT_PRICE: 'Gib einen Preis an',
        DESIRECREATE_MISSING_INPUT_TEXT_CATEGORY: 'Wähle eine Kategorie',
        DESIRECREATE_MISSING_INPUT_TEXT_DROPZONE: 'Wähle einen Ort',
        DESIRECREATE_EXPIRE_INPUT_DAY: "Tag",
        DESIRECREATE_EXPIRE_INPUT_DAYS: "Tage",
        DESIRECREATE_EXPIRE_INPUT_WEEK: "Woche",
        DESIRECREATE_EXPIRE_INPUT_WEEKS: "Wochen",
        DESIRECREATE_EXPIRE_INPUT_HOUR: "Stunde",
        DESIRECREATE_EXPIRE_INPUT_HOURS: "Stunden",

        /** DESIRE DETAIL **/
        DESIREDETAIL_BAR_TITLE: 'Auftrag',
        DESIREDETAIL_DESCRIPTION: 'Beschreibung',
        DESIREDETAIL_PRICE: 'Bezahlung',
        DESIREDETAIL_LOCATION: 'Ort',
        DESIREDETAIL_HAVER: 'Haver',
        DESIREDETAIL_HAVER_ACCEPTED: 'Akzeptierter Haver',
        DESIREDETAIL_NO_HAVER: 'Leider noch keine Haver vorhanden',
        DESIRE_DETAIL_HAVER_UNACCEPT_POPUP_TITLE: 'Transaktion abbrechen',
        DESIRE_DETAIL_HAVER_UNACCEPT_POPUP_SUBTITLE: 'Willst du die Transaktion wirklich abbrechen?',
        DESIRE_DETAIL_HAVER_UNACCEPT_POPUP_WARNING: 'Willst du die Transaktion wirklich abbrechen? Du bist akzeptierter Haver \n(Warnung: Bei wiederholtem Abbruch als akzeptierter Haver wird dies vermerkt!)',
        DESIRE_DETAIL_DELETION_POPUP_TITLE: 'Desire löschen',
        DESIRE_DETAIL_DELETION_POPUP_SUBTITLE: 'Willst du dein Desire wirklich löschen?',
        DESIRE_DETAIL_WANTER_UNACCEPT_POPUP_TITLE: 'Willst du die Transaktion wirklich abbrechen?',
        DESIRE_DETAIL_WANTER_UNACCEPT_POPUP_SUBTITLE: 'Willst du die Transaktion wirklich abbrechen? Du hast bereits einen Haver akzeptiert.',
        DESIRE_DETAIL_SUBMIT: 'Abschließen',
        DESIRE_DETAIL_CANCEL: 'Abbruch',
        DESIRE_DETAIL_REPORT_TITLE: 'Desire melden',
        DESIRE_DETAIL_REPORT_REASON: 'Grund',
        DESIRE_DETAIL_REPORT_REASON_1: 'Unangemessen',
        DESIRE_DETAIL_REPORT_REASON_2: 'Unmöglich',
        DESIRE_DETAIL_REPORT_REASON_3: 'Spam',
        DESIRE_DETAIL_COMMENT: 'Verfasse einen Kommentar',
        DESIREDETAIL_BID: 'Dein Angebot',
        DESIRE_DETAIL_REV_BIDDING_TITLE: 'Desire annehmen',
        DESIRE_DETAIL_REV_BIDDING_SUBTITLE: 'Erstelle dein Angebot',
        DESIRE_DETAIL_REV_BIDDING_MODIFY_TITLE: 'Angebot ändern',
        DESIRE_DETAIL_RATE_WANTER: 'Ersteller bewerten',
        DESIRE_DETAIL_REGISTERED: 'Du bist als Haver registriert! Du wirst benachrichtigt, sobald dich der Ersteller akzeptiert.',
        DESIRE_DETAIL_ACCEPTEDHAVER: "Glückwunsch, du wurdest vom Ersteller akzeptiert!",
        DESIRE_DETAIL_FINISH_INFO: "Wurde dein Auftrag erfüllt?",
        DESIRE_DETAIL_FINISH: "Auftrag abschließen",

        /** RATING **/
        RATING_BAR_TITLE: 'Bewertung',
        RATING_SUBTITLE: 'Deine Transaktion',
        RATING_SUMMARY: 'Transaktion - Zusammenfassung',
        RATING_TITLE: 'Deine Bewertung',
        RATING_POPUP_TITLE: 'Bewertung nicht abgeschlossen!',
        RATING_POPUP_SUBTITLE: 'Es muss mit mindestens einem stern bewertet werden.',

        /** FILTER SETTING **/
        FILTERSETTING_TITLE: 'Filter anpassen',
        FILTERSETTING_CATEGORY: 'Kategorie',
        FILTERSETTING_MINPRICE: 'Mindestpreis',
        FILTERSETTING_MAXPRICE: 'Maximalpreis',
        FILTERSETTING_MINRATING: 'Mindestrating',
        FILTERSETTING_APPLY: 'Filter anwenden',
        FILTERSETTING_RESET: 'Filter zurücksetzen',
        FILTERSETTING_RADIUS: 'Entfernungsradius',
        FILTERSETTING_LOCATION: 'Standort',

        /** CATEGORY_LIST **/
        CATEGORYLIST_TITLE: 'Wähle eine Kategorie',
        CATEGORYLIST_CANCEL: 'Abbrechen',

        /** MAP **/
        MAP_PROMPT_TITLE: 'Adresse eingeben',
        MAP_BUTTON: 'Als Ort setzen',
        MAP_TITLE: 'Ort auswählen',
        MAP_CLOSE_BUTTON: 'Abbrechen',


        /** ABOUT **/
        ABOUT_WEBSITE: 'Unsere Webseite www.wanthaver.com',
        ABOUT_AGB: 'AGB',
        ABOUT_LICENSES: 'Software-Lizenzen'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.forceAsyncReload(true);
});

wanthaver.config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('lib/i18n/angular-locale_{{locale}}.js');
});