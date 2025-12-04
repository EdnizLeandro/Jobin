
import { useState } from 'react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'

export const useNewsletter = () => {
  const [loading, setLoading] = useState(false)

  const subscribe = async (email: string, name?: string) => {
    setLoading(true)
    try {
      // Verificar se email já existe
      const { list: existing } = await lumi.entities.newsletter.list({
        filter: { email }
      })

      if (existing && existing.length > 0) {
        if (existing[0].isActive) {
          toast.error('Este email já está inscrito na newsletter!')
          return false
        } else {
          // Reativar inscrição
          await lumi.entities.newsletter.update(existing[0]._id, {
            isActive: true,
            name: name || existing[0].name,
            updatedAt: new Date().toISOString()
          })
          toast.success('Inscrição reativada com sucesso!')
          return true
        }
      }

      // Nova inscrição
      await lumi.entities.newsletter.create({
        email,
        name: name || '',
        isActive: true,
        source: 'website',
        preferences: {
          frequency: 'weekly',
          topics: ['lancamento', 'oportunidades']
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })

      toast.success('Inscrição realizada com sucesso!')
      return true
    } catch (error) {
      console.error('Erro ao inscrever na newsletter:', error)
      toast.error('Erro ao realizar inscrição. Tente novamente.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    subscribe,
    loading
  }
}
