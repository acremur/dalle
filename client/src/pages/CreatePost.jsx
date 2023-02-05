import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch('https://dalle-pi.vercel.app/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: form.prompt })
        })

        const data = await response.json()

        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        alert(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      alert('Please enter a prompt')
    }
  }
  
  const handleSubmit = async e => {
    e.preventDefault()

    if (form.prompt && form.photo) {
      setLoading(true)

      try {
        const response = await fetch('https://dalle-pi.vercel.app/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })

        await response.json()
        navigate('/')
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please enter a prompt and generate an image')
    }
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPromp = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPromp })
  }
  
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Crea una imagen</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
                      Genera imágenes creativas y visualmente impresionantes a través de DALL-E y compártelas con la comunidad.
        </p>
      </div>

      <form className="my-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField 
            labelName='Tu nombre' 
            type='text'
            name='name'
            placeholder='Pepito Grillo'
            value={form.value}
            handleChange={handleChange}
          />
          <FormField 
            labelName='Búsqueda' 
            type='text'
            name='prompt'
            placeholder='A plush toy robot sitting against a yellow wall'
            value={form.prompt}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
            handleChange={handleChange}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img 
                src={form.photo}
                alt={form.prompt} 
                className='w-full h-full object-contain'
              />
            ) : (
              <img 
                src={preview} 
                alt="preview" 
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg ? 'Generando...' : 'Generar'}
          </button>
        </div>

        <div className="mt-10">
          <p className='mt-2 text-[#666e75] text-[14px]'>Una vez que hayas creado la imagen que deseas, puedes compartirla con otros miembros de la comunidad.</p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? 'Compartiendo...' : 'Comparte con la comunidad'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost