wanthaver.config(function ($translateProvider) {
    $translateProvider.translations('en', {
        /** MENU **/
        MENU_ALL_DESIRES: 'All Desires',
        MENU_MY_DESIRE: 'My Desires',
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
        SETTINGS_PWRESET_BUTTON:'Reset my password',
        SETTINGS_PWRESET_POPUP_TITLE: 'Password reset mail',
        SETTINGS_PWRESET_POPUP_TEXT: 'Password reset mail was sent successfully!',
        SETTINGS_PWRESET_POPUP_TEXT_FAILED: 'Sending password reset mail failed!',

        /** DESIRE CREATE**/
        DESIRECREATE_BAR_TITLE1: 'Create Desire: Step 1',
        DESIRECREATE_BAR_TITLE2: 'Create Desire: Step 2',
        DESIRECREATE_BAR_TITLE3: 'Create Desire: Step 3',
        DESIRECREATE_TITLE: 'Titel',
        DESIRECREATE_DESCRIPTION: 'Description',
        DESIRECREATE_DESCRIPTION_PLACEGOLDER: 'Description (max 300 Characters)',
        DESIRECREATE_DATE: 'Expiration Date',
        DESIRECREATE_PRICE: 'Price',
        DESIRECREATE_CATEGORY: 'Select a Category',

        /** FILTER SETTING **/
        FILTERSETTING_TITLE: 'Change Filter',
        FILTERSETTING_CATEGORY: 'Category',
        FILTERSETTING_MINPRICE: 'Minimum price',
        FILTERSETTING_MAXPRICE: 'Maximum price',
        FILTERSETTING_MINRATING: 'Minimum Rating',
        FILTERSETTING_APPLY: 'Apply Filter',
        FILTERSETTING_RESET: 'Reset Filter',

        /** CATEGORY_LIST **/
        CATEGORYLIST_TITLE: 'Select a Category',
        CATEGORYLIST_CANCEL: 'Cancel',

        /** MAP **/
        MAP_PROMPT_TITLE: 'Enter Custom Location',
        MAP_BUTTON: 'Set As Location',
        MAP_TITLE: 'Choose a Location',
        MAP_CLOSE_BUTTON: 'Cancel',
    });
    $translateProvider.translations('de', {
        /** MENU **/
        MENU_ALL_DESIRES: 'Alle Aufträge',
        MENU_MY_DESIRE: 'Meine Aufträge',
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
        SETTINGS_PWRESET_BUTTON:'Mein Passwort zurücksetzen',
        SETTINGS_PWRESET_POPUP_TITLE: 'Passwort-Zurücksetzen E-Mail',
        SETTINGS_PWRESET_POPUP_TEXT: 'Du erhältst eine E-Mail zum Ändern des Passworts',
        SETTINGS_PWRESET_POPUP_TEXT_FAILED: 'E-Mail zum Zurücksetzen des Passwortes ist fehlgeschlagen!',

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

        /** FILTER SETTING **/
        FILTERSETTING_TITLE: 'Filter anpassen',
        FILTERSETTING_CATEGORY: 'Kategorie',
        FILTERSETTING_MINPRICE: 'Mindestpreis',
        FILTERSETTING_MAXPRICE: 'Maximalpreis',
        FILTERSETTING_MINRATING: 'Mindestrating',
        FILTERSETTING_APPLY: 'Filter anwenden',
        FILTERSETTING_RESET: 'Filter zurücksetzen',

        /** CATEGORY_LIST **/
        CATEGORYLIST_TITLE: 'Wähle eine Kategorie',
        CATEGORYLIST_CANCEL: 'Abbrechen',

        /** MAP **/
        MAP_PROMPT_TITLE: 'Adresse eingeben',
        MAP_BUTTON: 'Als Ort setzen',
        MAP_TITLE: 'Ort auswählen',
        MAP_CLOSE_BUTTON: 'Abbrechen',
    });
    $translateProvider.preferredLanguage('en');
});

wanthaver.config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('lib/i18n/angular-locale_{{locale}}.js');
});