"use client"

import { ChangeEvent, FormEvent, FormHTMLAttributes, useEffect, useState } from 'react';
import Input from '../Input';

interface Contato {
    id: Number;
    nome: string;
    mensagem: string;
    email: string;
    animal: string;
}

interface Cat {
    id: string;
    url: string;
    width: number;
    height: number;
    breeds: Array<string>;
    favourite: Array<string>;
}
interface Dog {
    id: string;
    url: string;
}

interface Animal {
    label: string;
    valor: string;
}

export function Contato(){
    const [contadorClick, setContadorClick] = useState(0);
    const [cooldown,  setCooldown] = useState(0);
    const [contatos, setContatos] = useState<Contato[]>([]);
    const [contato, setContato] = useState<Contato>({}as Contato);
    const [cats, setCats] = useState<Array<Cat>>([])
    const [dogs, setDogs] = useState<Array<Dog>>([])

    const [filtro, setFiltro] = useState('cat');
    const [animais, setAnimais] = useState<Animal[]>([]);

    
    const startCooldown = () => {

        debugger

        const intervalId = setInterval(() =>{
            setCooldown((prevCooldown) => {
                if(prevCooldown === 0){
                    clearInterval(intervalId);
                }
                return prevCooldown <= 0 ? prevCooldown : prevCooldown -1;
                
            });
        }, 1000);
    };

    function handleSubmit(e: FormEvent<HTMLElement>) {
        
        debugger
        console.log(e);
        e.preventDefault();
        if(contadorClick < 4){
            setContadorClick(contadorClick + 1);
        } else {
            setContadorClick(0);
            setCooldown(10);
            startCooldown();
        }

        const formValue = e.currentTarget as HTMLInputElement;

        const data: Contato = {
            id: Math.random() + 1,
            nome:  contato.nome,
            email: contato.email,
            mensagem: contato.mensagem,
            animal: contato.animal,
        }

        setContatos(oldValue => [data, ...oldValue]);
        
    }

    useEffect(() => {
        async function fetchDogs() {
            const response = await fetch("http://shibe.online/api/shibes?count=10");
            const data: string[] = await response.json();
            debugger

            const animal: any = data.map((d) =>  {
                return{
                label: d,
                valor: d,
                } as Animal
            });
            setAnimais([animal]);
        }

        async function fetchCats() {
            const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
            const data: Cat[] = await response.json();
            debugger

            const animal: any = data.map((d) =>  {
                return{
                label: d.id,
                valor: d.id,
                } as Animal
            });
            setAnimais([animal]);
        }


        if(filtro == 'dog')
        {
            fetchDogs();
        }
        else if(filtro == 'cat')
        {
            fetchCats();
        }
    }, [filtro]);

    return(
    <form onSubmit={handleSubmit} >
        <h1>Contato</h1>
        <div style={{display:'flex', flexDirection:'column', width: '60%', margin: '0 auto'}}>
            <Input name='name' id='name' placeholder='Nome' onChange={(e) => setContato({...contato!, nome : e.currentTarget.value})}/>
            <Input name='email' id='email' placeholder='Email' onChange={(e) => setContato({...contato!, email: e.currentTarget.value})} />
            <textarea name='message' id='message' placeholder='Mensagem' onChange={(e) => setContato({...contato!, mensagem: e.currentTarget.value})}/>
            
            <select onChange={(e) => setFiltro(e.currentTarget.value)}>
                <option value='cat'>Gatos</option>
                <option value='dog'>Cachorros</option>
            </select>
            
            <select name="" onChange={(e)=> setContato({...contato!, animal:e.target.value})}>
                {
                    animais.map(a => {
                        return <option key={a.valor} value={a.valor}>{a.label}</option>
                    })
                }
            </select>
            <button
            style={{'backgroundColor': cooldown > 0 ? "red" : 'green'}}
            disabled = {cooldown > 0} 
            >Salvar</button>
            <div>{cooldown}</div>

            {contatos.map((contato) => (
                <div key={String(contato.id)} >
                    <p>Nome: {contato.nome}</p>
                    <p>Email: {contato.email}</p>
                    <p>Message: {contato.mensagem}</p>
                    <p>Gato:
                        <div>
                            <img src={cats.find(x => x.id == contato.animal)?.url} />
                        </div>
                    </p>
                    <p>Gato:
                        <div>
                            <img src={dogs.find(x => x.id == contato.animal)?.url} />
                        </div>
                    </p>
                </div>
            ))}

        </div>
    </form>
    )
}
