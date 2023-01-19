
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const YAML = require('yaml')

const pt = (...p) => path.join(process.cwd(), ...p)
const dbPath = pt('db.yaml')
const load = () => YAML.parse(fs.readFileSync(dbPath).toString())
const write = (db) => fs.writeFileSync(dbPath, YAML.stringify(db, null, 2))

function sortCards() {
    const db = load()

    for (const memberCode of _.keys(db?.cards)) {
        for (const eraCode of _.keys(db?.cards?.[memberCode])) {
            for (const [sectionCode, sectionItems] of _.entries(db?.cards?.[memberCode]?.[eraCode])) {
                const sectionsDataByEra = db?.sections?.[eraCode]
                const sectionData = _.find(sectionsDataByEra, { code: sectionCode })
                if (!sectionData) {
                    console.log(`section ${sectionCode} not found`)
                    continue
                }

                const variantOrderMap = {}
                for (const [idx, variantName] of _.entries(_.keys(sectionData?.variant))) {
                    variantOrderMap[variantName] = Number(idx)
                }

                const orderedSectionItems = _.sortBy(sectionItems, [(si) => variantOrderMap[si?.name]])
                _.set(db, ['cards', memberCode, eraCode, sectionCode], orderedSectionItems)
            }
        }
    }

    write(db)
}

sortCards()