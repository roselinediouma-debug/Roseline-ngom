# Photos du guide Sénégal

Les photos actuelles proviennent d'Unsplash (libres de droits).
Elles peuvent être remplacées par tes propres photos **à tout moment** sans modifier le code.

## Comment remplacer une photo par la tienne

1. Choisis ta photo (format JPG idéalement)
2. Renomme-la **exactement** comme le fichier à remplacer (voir liste ci-dessous)
3. Place-la dans ce dossier `public/images/senegal/` (elle écrase l'ancienne)
4. Régénère le PDF : `npm run pdf:generate`
5. Commit + push → le site sera mis à jour automatiquement

## Formats recommandés

| Usage          | Largeur | Ratio | Orientation |
|----------------|---------|-------|-------------|
| Hero, cover    | 1600 px | 16:9  | Paysage     |
| Expériences    | 1600 px | 4:3   | Paysage     |
| Galerie        | 800 px  | 1:1   | Carré       |
| Témoignages    | 400 px  | 1:1   | Portrait    |

## Liste des fichiers

### Hero & cover PDF
- `hero.jpg`, utilisé en grand sur la landing `/guide` et en arrière-plan du CTA final
- `cover.jpg`, page de couverture du PDF

### Les 10 expériences
- `exp-01-lac-rose.jpg`, Lac Rose au coucher du soleil
- `exp-02-mbour.jpg`, Marché aux pirogues de Mbour
- `exp-03-carabane.jpg`, Île de Carabane en bolong
- `exp-04-goree.jpg`, Gorée avec un historien local
- `exp-05-bassari.jpg`, Pays Bassari en immersion
- `exp-06-saloum.jpg`, Delta du Saloum en pirogue
- `exp-07-saint-louis.jpg`, Saint-Louis de nuit à Guet Ndar
- `exp-08-niokolo.jpg`, Safari Niokolo-Koba
- `exp-09-lutte.jpg`, Lutte sénégalaise à Pikine
- `exp-10-lompoul.jpg`, Bivouac au désert de Lompoul

### Galerie mosaïque (section Instagram)
- `gallery-1.jpg` à `gallery-6.jpg`, 6 photos d'ambiance (peuvent être n'importe quoi d'évocateur : paysages, portraits, détails, nourriture…)

### Témoignages
- `testimonial-1.jpg` à `testimonial-3.jpg`, portraits des clients qui ont donné leur avis (pense à demander leur accord)

## Astuce

Si tu veux refaire les photos plus tard, pas besoin de tout remplacer d'un coup, tu peux le faire
photo par photo au fur et à mesure. Tant que les noms de fichiers correspondent, tout continue à marcher.
