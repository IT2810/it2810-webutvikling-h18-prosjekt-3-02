# it2810-webutvikling-h18-prosjekt-3-02

## Avhengigheter:
* Expo
* jest
* react-native
* react-native-elements
* react-navigation
* react-native-geo-fencing (*)

## Funksjonalitet:  
Prosjektet kalles for GeoNote, og er en trello lignende applikasjon gir gir deg tilgang til spesifikke gjøremål på spesifikke plasseringer. Det er en slags "Motivational manager" i den grad at den håndterer ulike gjøremål for deg basert på hvor du befinner deg. Dette skal motivere brukeren til å få ting unnagjort da det naturlig bryter "fjellet" av gjøremål ned og får det til å virke mer overkommelig siden man kun ser relevante gjøremål der man er, hvis man bruker lokasjonsfunksjonen. Følgende funksjonalitet er implementert:  
* Opprette og fjerne TODOs
* TODOs bundet til plasseringen din

Dersom vi skulle utviklet videre på appen ville vi hatt lyst til å legge til at man kunne definere egne locations, og på sikt kanskje ha et kart-view der man kunne se et kart over verden med notes liggende på de aktuelle stedene. Man kunne kanskje også lagt til et system der man fikk poeng for å fullføre oppgaver, og gitt brukeren muligheten til å definere hvor mange poeng de skulle få for å gjøre en oppgave slik at de selv kunne vekte de.

## For å starte opp: 
- Kjør Git clone
- Gå inn i mappen du klonet til
- Kjør npm install
- Kjør expo start

## Teknologier:  
Applikasjonen vår er basert på React Native, og vi har brukt Expo API under utviklingen. Vi lagrer data med AsyncStorage. Vi tester med jest. 

## Valg og løsninger

Valget å bruke React Native, Expo, jest og AsyncStorage var krav fra oppgaven sin side, men for å inkludere noe som er utover basic React Native UI-problematikk valgte vi å bruke telfonen sin lokasjonsmåler. Ved hjelp av react-native-geo-fencing definerer vi områder på kartet og så sjekker appen om telefonen befinner seg innenfor dette området. Det var i hvert fall planen, under utvikling viste det seg at dette biblioteket ikke fungerer, og vi måtte improvisere for å opprette en måte å sjekke om mobilen befant seg i et område. Dette gjør vi ved å sammenlikne brukerens lattitude og longitude med vårt predefinerte område. 

Implementasjonen av AsyncStorage var det vi hadde størst porblemer med på dette prosjektet. Vi sleit veldig med å få javascript til å utføre kall i den rekkefølgen vi trengte sånn at vi kunne få tilbake informasjonen fra storage. Løsningen ble at vi i stedet for å bruke getAllKeys og multiGet struktur (se kode under) på uthentingen fra storage valgte vi å bruke en vanlig for-loop og individuelle get-call i stedet.

Det vi ikke til å fungere: 

```javascript
AsyncStorage.getAllKeys((err, keys) => {
  AsyncStorage.multiGet(keys, (err, stores) => {
    stores.map((result, i, store) => {
      // get at each store's key/value so you can work with it
      let key = store[i][0];
      let value = store[i][1];
    });
  });
});
alert(s);
```

Vår løsning:

```javascript
 async getSections(keys) {
        let sectionArray = [];
         for (let i = 0; i<keys; i++) {
           const value = await AsyncStorage.getItem(i.toString());
           if (value !== null) {
             let note = JSON.parse(value)[0];
             if(note['key'] || this.state.inLocation) {
              sectionArray.push(note);
             }
           }
        }
       return sectionArray;
    }
```

Der keys er lengden av array-et som blir returnert av et getAllKeys kall. 

For å finne ut om brukeren er innen et område trenger koden vår sånn den er nå tre punkter av en firkant for å sammenlikne lengde og breddegrad. Den ser om den er mellom to av punktene langs den ene siden av firkanten AND mellom to av punktene langs en av de to andre kantene som ikke er paralelle med den første som ble sjekket. 

```javascript
 return await (point['lat'] > glos[0][0] && point['lat'] < glos[1][0]) && (point['lng'] > glos[1][1] && point['lng'] < glos[3][1]);
```

Vi var giret på å bruke bilioteket, og var derfor skuffet at vi måtte bruke en mer hardkodet versjon, men ettersom dette er prototype, ville vi med mer tid kunne byttet den ut med et passende bibliotek. 

For å lagre notes så lagrer vi tittel og data i et section object, også setter vi sammen et array av disse section objektene og sender det som en prop til en sectionList. 

```javascript
  newNote(index) {
        let newArr = [{title: this.title, data: [this.note], key: this.unBound}];
        AsyncStorage.setItem(index.toString(), JSON.stringify(newArr));
    }
```


## Bruk av GitHub  
Vi som alltid brukt GitHub på dette prosjektet. Det har fungert fint. Vi åpnet feature branches til alle deler av koden og merget disse tilbake i develop når vi var ferdige. Når GitHub ikke klarte å automatisk merge brukte vi mergeren som er bygget inn i WebStorm. Vi koblet branches og commits mot issues for å holde styr på hvem som gjorde hva, og hva som måtte gjøres. 


## Testing   
Vi var innstilt på å lage snapshot-tester til alle hoved-components. Disse ble skrevet, men på grunn av react-navigation så failer disse testene når de treffer: 

```javascript
 const {navigate} = this.props.navigation;
```

Når man snapshot-tester så prøver man å mounte en component alene, men i vår app så fungerer ingenting alene. Alt er avhengig av App.js fordi denne kaller stackNavigator-en vår. Vi hadde lyst til å unit-teste, men det er egentlig ingen logikk som ikke enten går mot state eller mot asyncStorage. State kan ikke jest teste, og asyncStorage er vi ikke helt sikre på, men vi fant ikke ut hvordan å gjøre dette siden for å ha storage må den i utgangspunktet kjøres på en enhet. 


