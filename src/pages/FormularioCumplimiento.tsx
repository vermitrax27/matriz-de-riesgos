import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, XCircle, HelpCircle, FileText, Shield, Users, Database, Scale, ArrowDown, Home, ArrowLeft } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  question: string;
  actions: {
    si: string;
    no: string;
    nose: string;
  };
  priority: {
    si: 'success' | 'warning' | 'urgent' | 'critical';
    no: 'success' | 'warning' | 'urgent' | 'critical';
    nose: 'success' | 'warning' | 'urgent' | 'critical';
  };
}

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  questions: Question[];
}

const FormularioCumplimiento = () => {
  const [currentView, setCurrentView] = useState<'formulario' | 'reporte'>('formulario');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const sections: Section[] = [
    {
      id: 'section1',
      title: 'Principios y Fundamentos del Tratamiento',
      icon: Scale,
      questions: [
        {
          id: '1_1',
          title: '1.1 Licitud del Tratamiento',
          question: '¿Puede su organización demostrar que cada una de sus actividades de tratamiento de datos personales tiene una base de licitud válida (consentimiento del titular o alguna de las excepciones del art. 13 de la ley)?',
          actions: {
            si: 'Excelente. Documente formalmente en un Registro de Actividades de Tratamiento cuál es la base de licitud para cada finalidad. Realice auditorías periódicas para asegurar que esta base de licitud sigue siendo válida.',
            no: 'Debe suspender cualquier tratamiento de datos que no tenga una base de licitud demostrable. Inicie un proyecto urgente para identificar y validar la base legal de cada actividad. Tratar datos sin una base lícita es una de las infracciones más graves.',
            nose: 'Inicie un diagnóstico legal inmediato para cada actividad de tratamiento. Determine si necesita obtener el consentimiento de los titulares o si puede ampararse en otra causal legal. La ambigüedad en este punto es un riesgo mayor.'
          },
          priority: { si: 'success', no: 'critical', nose: 'urgent' }
        },
        {
          id: '1_2',
          title: '1.2 Finalidad Específica y Limitada',
          question: '¿Ha definido y documentado fines específicos, explícitos y lícitos para cada actividad de tratamiento, y se asegura de no usar los datos para fines distintos a los informados?',
          actions: {
            si: 'Verifique que estos fines estén claramente comunicados en su política de privacidad pública (art. 14 ter) y en los avisos de privacidad al momento de recolectar los datos. Asegúrese de que su personal esté capacitado para no desviarse de estos fines.',
            no: 'Realice un inventario de todos sus tratamientos de datos y documente el propósito exacto de cada uno. Es ilegal tratar datos sin un fin predefinido o usarlos para "futuros fines no especificados".',
            nose: 'Convoque a los líderes de cada área de negocio para que definan y documenten los propósitos de todos los datos que utilizan. La falta de claridad sobre la finalidad es una infracción al principio de lealtad y transparencia.'
          },
          priority: { si: 'success', no: 'urgent', nose: 'warning' }
        },
        {
          id: '1_3',
          title: '1.3 Proporcionalidad y Plazo de Conservación',
          question: '¿Se asegura de tratar únicamente los datos estrictamente necesarios para cada finalidad y ha definido un plazo de conservación, tras el cual los datos son suprimidos o anonimizados?',
          actions: {
            si: 'Formalice estos plazos en una "Política de Retención y Supresión de Datos". Asegúrese de que sus sistemas tecnológicos puedan ejecutar la supresión o anonimización de forma automática o programada.',
            no: 'Revise inmediatamente sus bases de datos para identificar y eliminar datos que no son necesarios para los fines actuales. Defina y aplique plazos de conservación. Almacenar datos "por si acaso" indefinidamente es una infracción directa al principio de proporcionalidad.',
            nose: 'Realice un ejercicio de "minimización de datos". Para cada proceso, pregunte: "¿Es este dato absolutamente indispensable para cumplir el propósito?". Si la respuesta es no, debe dejar de recolectarlo y suprimir el existente. Establezca una política de retención.'
          },
          priority: { si: 'success', no: 'critical', nose: 'warning' }
        }
      ]
    },
    {
      id: 'section2',
      title: 'Transparencia y Derechos de los Titulares',
      icon: Users,
      questions: [
        {
          id: '2_1',
          title: '2.1 Información Pública y Accesible',
          question: '¿Tiene una Política de Privacidad publicada en su sitio web, que incluye toda la información mínima exigida por el artículo 14 ter de la ley?',
          actions: {
            si: 'Revise su política actual contra la lista de requisitos del artículo 14 ter para confirmar que no falta ningún punto. Programe una revisión anual para mantenerla actualizada.',
            no: 'Redacte y publique una Política de Privacidad que cumpla con todos los puntos del artículo 14 ter. La falta de transparencia es una infracción leve, pero es la primera cara visible de su cumplimiento.',
            nose: 'Designe a un responsable (legal, compliance, TI) para que redacte la Política de Privacidad. Es un documento esencial y obligatorio.'
          },
          priority: { si: 'success', no: 'urgent', nose: 'warning' }
        },
        {
          id: '2_2',
          title: '2.2 Procedimiento de Respuesta a Derechos',
          question: '¿Cuenta con un procedimiento interno formalizado para recibir, gestionar y responder las solicitudes de derechos de los titulares (acceso, rectificación, etc.) en un plazo máximo de 30 días corridos?',
          actions: {
            si: 'Ponga a prueba su procedimiento. Realice simulacros de solicitudes para medir los tiempos de respuesta y la calidad de la información entregada. Asegúrese de que los registros de cada solicitud y su respuesta se almacenen de forma segura.',
            no: 'Diseñe e implemente un procedimiento de gestión de derechos. Designe responsables, establezca flujos de trabajo y cree plantillas de respuesta. Omitir o responder fuera de plazo una solicitud es una infracción.',
            nose: 'Reúna a los equipos de atención al cliente, legal y TI para mapear cómo responderían a una solicitud hoy. Formalice ese proceso en un documento oficial y capacite al personal involucrado.'
          },
          priority: { si: 'success', no: 'critical', nose: 'warning' }
        }
      ]
    },
    {
      id: 'section3',
      title: 'Seguridad y Gestión de Riesgos',
      icon: Shield,
      questions: [
        {
          id: '3_1',
          title: '3.1 Medidas de Seguridad Apropiadas',
          question: '¿Ha implementado medidas de seguridad técnicas y organizativas (ej. cifrado, control de acceso, seudonimización) que son apropiadas para el nivel de riesgo de los datos que trata?',
          actions: {
            si: 'Documente estas medidas y la evaluación de riesgos que las justifica. Realice pruebas de seguridad periódicas (ej. pentesting) para verificar su eficacia y actualícelas conforme evoluciona la tecnología.',
            no: 'Realice una evaluación de riesgos de seguridad de inmediato. Identifique sus activos de datos más críticos y aplique medidas de seguridad básicas y luego avanzadas. Vulnerar el deber de seguridad es una infracción grave.',
            nose: 'Contrate a un experto en ciberseguridad o consulte a su equipo de TI para realizar un diagnóstico completo de sus sistemas. Es imposible proteger lo que no se conoce.'
          },
          priority: { si: 'success', no: 'critical', nose: 'warning' }
        },
        {
          id: '3_2',
          title: '3.2 Gestión de Brechas de Seguridad',
          question: '¿Tiene un plan de respuesta a incidentes que incluya procedimientos para notificar a la Agencia y a los titulares (cuando corresponda) en caso de una vulneración de datos?',
          actions: {
            si: 'Ponga a prueba su plan con un simulacro de brecha de seguridad. Mida cuánto tiempo toma detectar, evaluar y comunicar el incidente. Asegúrese de que todos los roles y responsabilidades estén claros.',
            no: 'Desarrolle un Plan de Respuesta a Incidentes. Debe definir qué es una brecha, quiénes forman el equipo de respuesta, cómo se evalúa el riesgo y cómo y cuándo se realizan las notificaciones obligatorias. Omitir la notificación de una brecha es una infracción grave.',
            nose: 'Comience por designar un equipo de respuesta a incidentes. Este equipo debe investigar las mejores prácticas y redactar un plan. Puede apoyarse en estándares internacionales como los del NIST o ISO.'
          },
          priority: { si: 'success', no: 'urgent', nose: 'warning' }
        }
      ]
    },
    {
      id: 'section4',
      title: 'Relaciones con Terceros y Transferencias',
      icon: Database,
      questions: [
        {
          id: '4_1',
          title: '4.1 Contratos con Encargados (Procesadores)',
          question: 'Cuando contrata a un proveedor para que trate datos en su nombre (ej. una empresa de marketing, un proveedor de software en la nube), ¿firma un contrato de mandato que cumple con todos los requisitos del artículo 15 bis?',
          actions: {
            si: 'Audite sus contratos vigentes con proveedores para asegurarse de que todos cumplan con las exigencias de la nueva ley. Para nuevos contratos, utilice una plantilla validada legalmente.',
            no: 'Realice un inventario de todos sus proveedores que tratan datos personales. Contacte a cada uno para firmar una adenda o un nuevo contrato que se ajuste al artículo 15 bis. Compartir datos con un encargado sin el contrato adecuado es una vulneración de la ley.',
            nose: 'Inicie un proceso de "due diligence" de proveedores. Pregunte a sus equipos de compras, TI y marketing con qué terceros comparten datos, y revise la base contractual de cada relación.'
          },
          priority: { si: 'success', no: 'critical', nose: 'warning' }
        }
      ]
    },
    {
      id: 'section5',
      title: 'Responsabilidad y Gobernanza de Datos',
      icon: FileText,
      questions: [
        {
          id: '5_1',
          title: '5.1 Demostración del Cumplimiento (Accountability)',
          question: '¿Mantiene registros, políticas y procedimientos internos que le permitan demostrar activamente a la Agencia que cumple con los principios y obligaciones de la ley?',
          actions: {
            si: 'Organice toda su documentación en un "Programa de Cumplimiento en Protección de Datos". Considere la adopción de un Modelo de Prevención de Infracciones certificable por la Agencia, lo que puede actuar como atenuante.',
            no: 'Comience a documentar todo. El principio de responsabilidad significa que "cumplir no es suficiente, hay que ser capaz de demostrarlo". Su primera tarea es crear un Registro de Actividades de Tratamiento.',
            nose: 'Designe a un Delegado de Protección de Datos o un Encargado de Prevención (art. 49, 50). Esta persona será responsable de construir y supervisar el programa de gobernanza de datos de la organización. Es una inversión estratégica para mitigar riesgos.'
          },
          priority: { si: 'success', no: 'warning', nose: 'warning' }
        }
      ]
    }
  ];

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const generateReport = () => {
    setCurrentView('reporte');
  };

  const resetForm = () => {
    setCurrentView('formulario');
    setAnswers({});
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      urgent: 'bg-orange-50 border-orange-200 text-orange-800',
      critical: 'bg-red-50 border-red-200 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <HelpCircle className="w-5 h-5 text-yellow-600" />;
      case 'urgent': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <HelpCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityLabel = (priority: string) => {
    const labels = {
      success: 'Excelente',
      warning: 'Acción Requerida',
      urgent: 'Acción Urgente',
      critical: 'Acción Crítica'
    };
    return labels[priority as keyof typeof labels] || 'Revisar';
  };

  const allQuestionsAnswered = () => {
    const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
    return Object.keys(answers).length === totalQuestions;
  };

  if (currentView === 'reporte') {
    const priorityOrder = ['critical', 'urgent', 'warning', 'success'];
    const reportItems: Array<{
      section: string;
      question: string;
      priority: string;
      action: string;
      icon: React.ComponentType<{ className?: string }>;
    }> = [];

    sections.forEach(section => {
      section.questions.forEach(question => {
        const answer = answers[question.id];
        if (answer) {
          const priority = question.priority[answer as keyof typeof question.priority];
          const action = question.actions[answer as keyof typeof question.actions];
          reportItems.push({
            section: section.title,
            question: question.title,
            priority,
            action,
            icon: section.icon
          });
        }
      });
    });

    reportItems.sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));

    const criticalCount = reportItems.filter(item => item.priority === 'critical').length;
    const urgentCount = reportItems.filter(item => item.priority === 'urgent').length;
    const warningCount = reportItems.filter(item => item.priority === 'warning').length;
    const successCount = reportItems.filter(item => item.priority === 'success').length;

    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Reporte de Cumplimiento - Ley 21.719
              </h1>
              <div className="flex space-x-4">
                <button 
                  onClick={resetForm}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Nueva Evaluación
                </button>
                <Link 
                  to="/"
                  className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Repositorio
                </Link>
              </div>
            </div>

            {/* Resumen Ejecutivo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
                <div className="text-sm text-red-800">Acciones Críticas</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{urgentCount}</div>
                <div className="text-sm text-orange-800">Acciones Urgentes</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
                <div className="text-sm text-yellow-800">Acciones Requeridas</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{successCount}</div>
                <div className="text-sm text-green-800">En Cumplimiento</div>
              </div>
            </div>

            {criticalCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <XCircle className="w-6 h-6 text-red-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Atención Inmediata Requerida</h3>
                    <p className="text-red-700 text-sm">
                      Se han identificado {criticalCount} área(s) con riesgo crítico de incumplimiento. 
                      Es imperativo abordar estas deficiencias de inmediato para evitar infracciones graves.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Plan de Acción Detallado */}
          <div className="space-y-4">
            {reportItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${getPriorityColor(item.priority)}`}>
                  <div className="flex items-start">
                    <div className="flex items-center mr-4">
                      {getPriorityIcon(item.priority)}
                      <Icon className="w-5 h-5 ml-2 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{item.question}</h3>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-70">
                          {getPriorityLabel(item.priority)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.section}</p>
                      <p className="text-sm leading-relaxed">{item.action}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <HelpCircle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Próximos Pasos Recomendados</h3>
                <ol className="text-blue-700 text-sm space-y-1">
                  <li>1. Priorice las acciones críticas y urgentes</li>
                  <li>2. Asigne responsables y fechas límite para cada acción</li>
                  <li>3. Documente todas las medidas implementadas</li>
                  <li>4. Programe revisiones periódicas de cumplimiento</li>
                  <li>5. Considere buscar asesoría legal especializada</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Formulario Interactivo de Cumplimiento para el Responsable del Tratamiento
            </h1>
            <Link 
              to="/"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Repositorio
            </Link>
          </div>
          <p className="text-gray-600 mb-4">
            Para cada pregunta, seleccione la opción que mejor represente el estado actual de su organización. 
            Al finalizar, recibirá un plan de acción personalizado para cerrar brechas de cumplimiento.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <p className="text-yellow-800 text-sm">
                <strong>Aviso Legal:</strong> Esta es una guía y no sustituye la asesoría legal especializada.
              </p>
            </div>
          </div>
        </div>

        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.id} className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <Icon className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
              </div>
              
              {section.questions.map((question) => (
                <div key={question.id} className="mb-8 last:mb-0">
                  <h3 className="font-medium text-gray-800 mb-3">{question.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{question.question}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      onClick={() => handleAnswerChange(question.id, 'si')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        answers[question.id] === 'si'
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-200 hover:border-green-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        SÍ
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleAnswerChange(question.id, 'no')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        answers[question.id] === 'no'
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-gray-200 hover:border-red-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <XCircle className="w-5 h-5 mr-2" />
                        NO
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleAnswerChange(question.id, 'nose')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        answers[question.id] === 'nose'
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-800'
                          : 'border-gray-200 hover:border-yellow-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 mr-2" />
                        NO SÉ
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                {Object.keys(answers).length} de {sections.reduce((sum, s) => sum + s.questions.length, 0)} preguntas respondidas
              </p>
              <div className="w-64 bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(Object.keys(answers).length / sections.reduce((sum, s) => sum + s.questions.length, 0)) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <button
              onClick={generateReport}
              disabled={!allQuestionsAnswered()}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                allQuestionsAnswered()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ArrowDown className="w-5 h-5 mr-2" />
              Generar Reporte de Cumplimiento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioCumplimiento;