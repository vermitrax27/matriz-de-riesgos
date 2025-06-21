import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Users, FileText, Search, Shield, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';

const HomePage = () => {
  const cuestionarios = [
    {
      id: 'flujo-proteccion-datos',
      title: 'Flujo de Determinación de Roles',
      subtitle: 'Ley 21.719 - Versión Simplificada',
      description: 'Flujo interactivo para determinar si su organización actúa como Responsable, Encargado o Corresponsable en una actividad específica de tratamiento de datos.',
      icon: Scale,
      difficulty: 'Básico',
      duration: '5-10 min',
      path: '/flujo-proteccion-datos',
      color: 'blue'
    },
    {
      id: 'cuestionario-cepd',
      title: 'Cuestionario Técnico CEPD',
      subtitle: 'Basado en Directrices 07/2020',
      description: 'Cuestionario profesional basado en las directrices del Comité Europeo de Protección de Datos para la determinación precisa de roles.',
      icon: BookOpen,
      difficulty: 'Avanzado',
      duration: '10-15 min',
      path: '/cuestionario-cepd',
      color: 'purple'
    },
    {
      id: 'formulario-cumplimiento',
      title: 'Formulario de Cumplimiento',
      subtitle: 'Para Responsables del Tratamiento',
      description: 'Evaluación integral del cumplimiento de las obligaciones del Responsable con plan de acción personalizado.',
      icon: Shield,
      difficulty: 'Intermedio',
      duration: '15-20 min',
      path: '/formulario-cumplimiento',
      color: 'green'
    },
    {
      id: 'evaluacion-datos-personales',
      title: 'Evaluación de Datos Personales',
      subtitle: 'Análisis Técnico Extendido',
      description: 'Análisis profundo para determinar si un dataset contiene datos personales, incluyendo evaluación de anonimización.',
      icon: Search,
      difficulty: 'Experto',
      duration: '20-30 min',
      path: '/evaluacion-datos-personales',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        badge: 'bg-blue-100 text-blue-800'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
        badge: 'bg-purple-100 text-purple-800'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        badge: 'bg-green-100 text-green-800'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        icon: 'text-indigo-600',
        button: 'bg-indigo-600 hover:bg-indigo-700',
        badge: 'bg-indigo-100 text-indigo-800'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Scale className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-800">
              Repositorio de Cuestionarios
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Herramientas Interactivas para el Cumplimiento de la Ley N° 21.719
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Colección especializada de cuestionarios y formularios para ayudar a las organizaciones 
            a navegar el complejo marco legal de protección de datos personales en Chile.
          </p>
        </div>

        {/* Aviso Legal */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Aviso Legal Importante</h3>
              <p className="text-yellow-700 text-sm">
                Estas herramientas son de orientación y no constituyen asesoramiento legal. 
                La Ley 21.719 es compleja y su aplicación depende del análisis fáctico de cada caso. 
                Se recomienda encarecidamente validar las conclusiones con un abogado especializado 
                en protección de datos.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de Cuestionarios */}
        <div className="grid md:grid-cols-2 gap-6">
          {cuestionarios.map((cuestionario) => {
            const Icon = cuestionario.icon;
            const colorClasses = getColorClasses(cuestionario.color);
            
            return (
              <div 
                key={cuestionario.id}
                className={`${colorClasses.bg} ${colorClasses.border} border rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
              >
                <div className="flex items-start mb-4">
                  <Icon className={`w-8 h-8 ${colorClasses.icon} mr-4 mt-1`} />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {cuestionario.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-medium mb-2">
                      {cuestionario.subtitle}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {cuestionario.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClasses.badge}`}>
                      {cuestionario.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {cuestionario.duration}
                    </span>
                  </div>
                </div>
                
                <Link
                  to={cuestionario.path}
                  className={`w-full ${colorClasses.button} text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center group`}
                >
                  Iniciar Cuestionario
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Información Adicional */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ¿Cómo usar este repositorio?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Identifica tu Necesidad</h3>
              <p className="text-gray-600 text-sm">
                Determine qué aspecto de la ley necesita evaluar: roles, cumplimiento, o naturaleza de los datos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Selecciona la Herramienta</h3>
              <p className="text-gray-600 text-sm">
                Elija el cuestionario apropiado según su nivel de experiencia y profundidad requerida.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Documenta los Resultados</h3>
              <p className="text-gray-600 text-sm">
                Guarde las conclusiones y recomendaciones para evidenciar su proceso de cumplimiento.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Repositorio de Cuestionarios • Ley N° 21.719 de Protección de Datos Personales • Chile
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;