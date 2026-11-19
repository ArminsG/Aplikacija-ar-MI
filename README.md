# Mani uzdevumi

Uzdevumu saraksta tīmekļa lietotne, kas izveidota ar MI palīdzību praktiskajā darbā **PD1 "Pirmā strādājošā lietotne ar MI"** (kurss "Programmatūras izstrāde ar MI").

Lietotne darbojas pārlūkā bez servera un bez interneta. Tā izmanto tikai HTML, CSS un JavaScript, un dati glabājas pārlūka `localStorage`.

**Autors:** _Vārds Uzvārds_ · **Grupa:** _____ · **Repozitorijs:** _https://github.com/LIETOTAJS/mani-uzdevumi_

## Palaišana

1. Lejupielādē vai noklonē repozitoriju:
   ```bash
   git clone https://github.com/LIETOTAJS/mani-uzdevumi.git
   ```
2. Atver failu `index.html` jebkurā mūsdienīgā pārlūkā (dubultklikšķis uz faila).

## Funkcijas

- Uzdevuma pievienošana ar pogu vai taustiņu Enter
- Atzīmēšana kā izpildīts un atzīmes noņemšana
- Dzēšana, kā arī poga "Dzēst izpildītos"
- Neizpildīto uzdevumu skaitītājs
- Filtri: Visi / Aktīvie / Izpildītie
- Dati saglabājas arī pēc lapas pārlādes (`localStorage`)
- **Papildfunkcija A: labošana.** Poga "Labot" vai dubultklikšķis uz teksta; Enter saglabā, Escape atceļ.
- Ievades pārbaude: tukšs vai tikai no atstarpēm sastāvošs teksts netiek pieņemts, maksimālais garums ir 200 rakstzīmes.

## Faili

| Fails | Saturs |
|---|---|
| `index.html` | Lapas struktūra |
| `style.css` | Izskats |
| `app.js` | Loģika: dati, darbības, attēlošana, notikumi |
| `docs/UZVEDNE.md` | Sešu daļu uzvedne MI modelim |
| `docs/T2_TESTI.md` | T2 testu tabula (10 testi + papildfunkcijas testi) |
| `docs/KLUDU_ZURNALS.md` | Kļūdu ziņošanas veidne un žurnāls |
| `docs/T4_MI_LIETOJUMS.md` | MI lietojuma pārskats |
| `docs/PARBAUDES_SARAKSTS.md` | Pārbaudes saraksts pirms iesniegšanas |

## Kā darbojas kods (aizstāvēšanai)

- `tasks` ir uzdevumu masīvs `{ id, text, done }`, un `currentFilter` ir aktīvais filtrs.
- `loadTasks()` / `saveTasks()` nolasa un ieraksta masīvu `localStorage` kā JSON. Bojātu datu gadījumā lietotne sāk ar tukšu sarakstu.
- `validate()` pārbauda teksta garumu, un to izmanto gan `addTask()`, gan `editTask()`.
- `addTask`, `toggleTask`, `deleteTask`, `editTask`, `clearDone` maina masīvu, saglabā to un izsauc `render()`.
- `render()` pārzīmē sarakstu no masīva: filtrs, skaitītājs un tukšā saraksta paziņojums.
- `startEditing()` uzdevuma tekstu aizstāj ar ievades lauku (papildfunkcija A).
- Teksts tiek attēlots ar `textContent`, tāpēc lietotāja ievadīts HTML netiek izpildīts.

## MI izmantošana

Kods ģenerēts ar MI tērzēšanas asistentu, izmantojot `docs/UZVEDNE.md` uzvedni. Pēc tam tas pārbaudīts ar T2 testiem un labots. Sīkāk aprakstīts `docs/T4_MI_LIETOJUMS.md`.
