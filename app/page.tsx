"use client";

import React from "react";
import { MessageCircle, Bot, Hotel, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function BrasilSmartServiceWebsite() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* HERO */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-800 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Brasil Smart Service
            </h1>

            <p className="text-lg mb-6">
              Automatize o atendimento da sua pousada ou hotel no WhatsApp com
              inteligência artificial. Respostas instantâneas, reservas
              automatizadas e atendimento 24h.
            </p>

            <div className="flex gap-4">
              <button className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100">
                Solicitar Demonstração
              </button>

              <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-green-700">
                Falar no WhatsApp
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur rounded-2xl p-8 shadow-xl"
          >
            <Bot size={60} />
            <h3 className="text-2xl font-semibold mt-4">
              Seu recepcionista inteligente
            </h3>
            <p className="mt-2 text-sm opacity-90">
              Atendimento automático que entende perguntas, envia preços,
              confirma reservas e chama humanos quando necessário.
            </p>
          </motion.div>

        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-12">
          Como funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <MessageCircle className="mx-auto text-green-600" size={40} />
            <h3 className="font-semibold mt-4">1. Conecte o WhatsApp</h3>
            <p className="text-sm mt-2">
              Integre seu número em poucos minutos.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <Hotel className="mx-auto text-green-600" size={40} />
            <h3 className="font-semibold mt-4">2. Configure seu Hotel</h3>
            <p className="text-sm mt-2">
              Adicione preços, regras e disponibilidade.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 text-center">
            <Bot className="mx-auto text-green-600" size={40} />
            <h3 className="font-semibold mt-4">3. IA Atende Sozinha</h3>
            <p className="text-sm mt-2">
              O sistema responde hóspedes automaticamente 24h.
            </p>
          </div>

        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-12">
            Benefícios
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Atendimento 24 horas",
              "Respostas instantâneas",
              "Integração com reservas",
              "Redução de trabalho manual",
              "Aumento das reservas diretas",
              "Suporte humano quando necessário",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                <p>{item}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 text-white py-16 px-6 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Transforme o atendimento do seu hotel hoje
        </h2>

        <p className="mb-6">
          Comece a automatizar reservas e atendimento em poucos minutos.
        </p>

        <button className="bg-white text-green-700 px-8 py-3 rounded-xl font-semibold">
          Começar Agora
        </button>

      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
        <p>© {new Date().getFullYear()} Brasil Smart Service</p>
        <p>Automação inteligente para hotéis e pousadas</p>
      </footer>

    </div>
  );
}