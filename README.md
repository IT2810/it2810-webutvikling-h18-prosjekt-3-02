# it2810-webutvikling-h18-prosjekt-3-02

## Avhengigheter:
* Expo
* jest
* jest-expo
* react-native
* react-native-elements
* react-navigation
* react-native-geo-fencing

## Funksjonalitet:  
Prosjektet kalles for GeoNote, og er en trello lignende applikasjon gir gir deg tilgang til spesifikke gjøremål på spesifikke plasseringer. Det er en slags "Motivational manager" i den grad av at den håndterer ulike gjøremål for deg om du eksempeltvis enten er på skolen, hjemme eller trener, slik at du ikke blir distrahert av gjøremål som skal gjøres hjemme når du er på skolen. Dette skal motivere brukeren til å få ting unnagjort da det naturlig bryter "fjellet" av gjøremål ned og får det til å virke mer overkommelig siden man kun ser relevante gjøremål der man er hvis man bruker lokasjonsfunksjonen. Følgende funksjonalitet er implementert:  
* Opprette og fjerne TODOs
* TODOs bundet til plasseringen din

Dersom vi skulle utviklet videre på appen ville hatt lyst til å legge til at man kunne definere egne locations, og på sikt kanskje ha et kart-view der man kunne se et kart over verden med notes liggende på de aktuelle stedene. Man kunne kanskje også lagt til et system der man fikk poeng for å fullføre oppgaver, og gitt brukeren muligheten til å definere hvor mange poeng de skulle få for å gjøre en oppgave slik at de selv kunne vekte de.

## Teknologier:  
Applikasjonen vår er basert på React Native, og vi har brukt Expo API under utviklingen. Vi lagrer data med AsyncStorage. 

## Valg og løsninger

Valget å bruke React Native, Expo og AsyncStorage var krav fra oppgaven sin side, men for å inkludere som er utover basic React Native UI-problematikk valgte vi å bruke telfonen sin lokasjonsmåler. Ved hjelp av react-native-geo-fencing definerer vi områder på kartet også sjekker appen om telefonen befinner seg innenfor dette området. 

Implementasjonen av AsyncStorage var det vi hadde størst porblemer med på dette prosjektet. Vi sleit veldig med å få javascript til å utføre kall i den rekkefølgen vi trengte sånn at vi kunne få tilbake informasjonen fra storage. Løsningen ble at vi i stedet for å bruke getAllKeys og multiGet struktur på uthentingen fra storage valgte vi å bruke en vanlig for-loop og individuelle get-call i stedet.

[paste inn kode av getAllKeys og multiget]

[paste inn kode av vår løsning]


## Bruk av GitHub  





## Testing   
Prosjektet er testet med testrammeverket Jest.  



