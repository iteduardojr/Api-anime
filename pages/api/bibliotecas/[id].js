import { child, get, ref, remove, update } from "firebase/database"
import { db } from "../../../services/firebase"

export default function handler(req, res) {

    const id = req.query.id

    if (req.method == 'GET') {
        get(child(ref(db), 'biblioteca/' + id)).then(snapshot => {
            res.status(200).json(snapshot.val())
        })
    } else if (req.method == 'PUT') {
        const dados = req.body

        update(ref(db, `biblioteca/${id}`), dados)
        res.status(200).json(dados)

    } else if (req.method == 'DELETE') {
        remove(ref(db, 'biblioteca/' + id))
        res.status(200).json(id)
    }
}