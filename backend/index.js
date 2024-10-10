import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { MercadoPagoConfig, Payment } from 'mercadopago'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).json({ msg: "Hello" });
});

app.post('/api', async (req, res) => {
    const {email, nome, last_name, cpf } = req.body
    if (nome) {
        const client = new MercadoPagoConfig({ accessToken: process.env.API_KEY, options: { timeout: 5000 } })

        const payment = new Payment(client)

        const body = {
            'transaction_amount': 12.50,
            'description': 'Teste Api pix',
            'payment_method_id': 'pix',
            "payer": {
                'email': email,
                'first_name': nome,
                'last_name': last_name,
                'identification': {
                    'type': 'CPF',
                    'number': cpf
                }
            }
        };
        const link = await payment.create({ body }).then((i) => i.point_of_interaction.transaction_data.ticket_url).catch((i) => {console.error("Erro ao criar o pagamento:", error)})
        console.log(link)
        return res.json({"link": link})
    }
    return res.status(400).json({ msg: "erro na requisição" })
});

app.listen(3333, () => {
    console.log('rodando')
})