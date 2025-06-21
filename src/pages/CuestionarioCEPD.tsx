import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, XCircle, HelpCircle, ArrowRight, ArrowLeft, Home, Scale, Users, FileText, Shield, BookOpen } from 'lucide-react';

const CuestionarioCEPD = () => {
  const [currentStep, setCurrentStep] = useState('inicio');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFactors, setShowFactors] = useState(false);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Lógica de navegación según las respuestas
    switch (questionId) {
      case 'q1_1':
        if (answer === 'no') {
          setCurrentStep('conclusion_unico');
        } else {
          setCurrentStep('q2_1');
        }
        break;
      case 'q2_1':
        if (answer === 'si') {
          setCurrentStep('conclusion_legal_explicito');
        } else {
          setCurrentStep('q2_2');
        }
        break;
      case 'q2_2':
        if (answer === 'si') {
          setCurrentStep('conclusion_legal_implicito');
        } else {
          setCurrentStep('q3_1');
        }
        break;
      case 'q3_1':
        if (answer === 'si') {
          setCurrentStep('q5_1');
        } else if (answer === 'no') {
          setCurrentStep('q3_2');
        } else {
          setShowFactors(true);
        }
        break;
      case 'q3_2':
        setCurrentStep('conclusion_encargado');
        break;
      case 'q5_1':
        if (answer === 'si') {
          setCurrentStep('q5_2');
        } else {
          setCurrentStep('conclusion_responsable_unico');
        }
        break;
      case 'q5_2':
        if (answer === 'si') {
          setCurrentStep('conclusion_corresponsable_total');
        } else {
          setCurrentStep('conclusion_corresponsable_fases');
        }
        break;
    }
  };

  const resetFlow = () => {
    setCurrentStep('inicio');
    setAnswers({});
    setShowFactors(false);
  };

  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Volver
    </button>
  );

  interface ModuleCardProps {
    moduleNumber: string;
    title: string;
    children: React.ReactNode;
    helpText?: string;
    icon?: React.ComponentType<{ className?: string }>;
  }

  const ModuleCard = ({ moduleNumber, title, children, helpText, icon: Icon }: ModuleCardProps) => (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-start mb-4">
        {Icon && <Icon className="w-6 h-6 text-blue-600 mr-3 mt-1" />}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mr-3">
              MÓDULO {moduleNumber}
            </span>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          </div>
          {children}
        </div>
      </div>
      {helpText && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <div className="flex items-start">
            <HelpCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
            <div className="text-sm text-blue-800">
              <strong>Ayuda:</strong> {helpText}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const AnswerButton = ({ onClick, children, variant = 'primary' }: { onClick: () => void; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'warning' | 'option' }) => {
    const baseClasses = "w-full p-4 rounded-lg font-medium transition-colors mb-3 text-left";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      warning: "bg-yellow-500 text-white hover:bg-yellow-600",
      option: "bg-gray-50 border border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-blue-50"
    };
    
    return (
      <button 
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };

  const ConclusionCard = ({ title, type, children, recommendation }: { title: string; type: 'success' | 'info' | 'warning'; children: React.ReactNode; recommendation?: string }) => {
    const typeStyles = {
      success: { bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle, color: 'text-green-600' },
      info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: Scale, color: 'text-blue-600' },
      warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: AlertTriangle, color: 'text-yellow-600' }
    };
    
    const style = typeStyles[type];
    const Icon = style.icon;
    
    return (
      <div className={`${style.bg} ${style.border} border rounded-lg p-6 max-w-4xl mx-auto`}>
        <div className="flex items-start mb-4">
          <Icon className={`w-6 h-6 ${style.color} mr-3 mt-1`} />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
            <div className="text-gray-700 mb-4">{children}</div>
            {recommendation && (
              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-400 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Conclusión:</h3>
                <p className="text-gray-700 text-sm">{recommendation}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={resetFlow}
            className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Analizar nueva actividad
          </button>
          <Link 
            to="/"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al repositorio
          </Link>
        </div>
      </div>
    );
  };

  // Componente principal de renderizado
  const renderStep = () => {
    switch (currentStep) {
      case 'inicio':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-800">
                  Cuestionario para la Determinación de Roles (Ley 21.719)
                </h1>
              </div>
              <Link 
                to="/"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Repositorio
              </Link>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Basado en Anexo I de las Directrices 07/2020 del Comité Europeo de Protección de Datos (CEPD)</strong>
              </p>
            </div>

            <p className="text-gray-600 mb-6">
              Este cuestionario le guiará a través de un proceso lógico para determinar su rol en una actividad 
              específica de tratamiento de datos personales. Para usarlo correctamente, es fundamental que primero 
              identifique una operación de tratamiento concreta (ej. gestión de nóminas, plataforma de e-commerce, 
              proyecto de investigación) y responda las preguntas pensando en esa actividad específica.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-medium mb-2">Aviso Legal</p>
                  <p className="text-yellow-700 text-sm">
                    Esta es una herramienta de orientación. La determinación final de los roles depende de un 
                    análisis fáctico de cada caso. Se recomienda encarecidamente la consulta con un abogado 
                    especializado para validar sus conclusiones.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Instrucciones:</h3>
              <ol className="text-green-700 text-sm space-y-1">
                <li>1. Identifique una actividad específica de tratamiento de datos</li>
                <li>2. Responda cada pregunta pensando únicamente en esa actividad</li>
                <li>3. Siga la lógica modular del cuestionario</li>
                <li>4. Al final obtendrá su rol específico para esa actividad</li>
              </ol>
            </div>

            <AnswerButton onClick={() => setCurrentStep('q1_1')}>
              <div className="flex items-center">
                <ArrowRight className="w-5 h-5 mr-2" />
                Comenzar determinación de rol
              </div>
            </AnswerButton>
          </div>
        );

      case 'q1_1':
        return (
          <ModuleCard 
            moduleNumber="1"
            title="Filtro Inicial - ¿Hay otros actores involucrados?"
            icon={Users}
          >
            <p className="text-gray-700 mb-6">
              Para la actividad de tratamiento de datos personales que está analizando, 
              ¿participa alguna <strong>otra persona o entidad externa</strong> a su organización?
            </p>
            <AnswerButton onClick={() => handleAnswer('q1_1', 'si')}>
              SÍ - Hay otras entidades involucradas
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q1_1', 'no')} variant="secondary">
              NO - Solo mi organización participa
            </AnswerButton>
          </ModuleCard>
        );

      case 'q2_1':
        return (
          <ModuleCard 
            moduleNumber="2"
            title="Determinación del Rol por Mandato Legal"
            icon={Scale}
          >
            <BackButton onClick={() => setCurrentStep('q1_1')} />
            <p className="text-gray-700 mb-6">
              ¿Una ley chilena o de la Unión Europea (si aplica) <strong>designa explícitamente</strong> a su 
              organización como Responsable (Controlador) para esta actividad de tratamiento de datos?
            </p>
            <AnswerButton onClick={() => handleAnswer('q2_1', 'si')}>
              SÍ - La ley nos designa explícitamente como Responsable
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q2_1', 'no')} variant="secondary">
              NO - No hay designación legal explícita
            </AnswerButton>
          </ModuleCard>
        );

      case 'q2_2':
        return (
          <ModuleCard 
            moduleNumber="2"
            title="Determinación del Rol por Mandato Legal"
            icon={Scale}
            helpText="Por ejemplo, una ley que obliga a las municipalidades a gestionar beneficios sociales requiere que traten los datos de los postulantes para cumplir esa función. De igual forma, los órganos públicos que tratan datos para el cumplimiento de sus funciones legales actúan como responsables (Ley 21.719, art. 20)."
          >
            <BackButton onClick={() => setCurrentStep('q2_1')} />
            <p className="text-gray-700 mb-6">
              ¿El tratamiento de datos es <strong>estrictamente necesario</strong> para llevar a cabo una tarea 
              o cumplir una obligación que una ley le asigna a su organización?
            </p>
            <AnswerButton onClick={() => handleAnswer('q2_2', 'si')}>
              SÍ - Es necesario para cumplir una obligación legal
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q2_2', 'no')} variant="secondary">
              NO - No está vinculado a una obligación legal específica
            </AnswerButton>
          </ModuleCard>
        );

      case 'q3_1':
        return (
          <ModuleCard 
            moduleNumber="3"
            title="Determinación Factual (Decisión sobre Fines y Medios Esenciales)"
            icon={FileText}
          >
            <BackButton onClick={() => setCurrentStep('q2_2')} />
            <p className="text-gray-700 mb-4">
              Para esta actividad de tratamiento, ¿su organización toma las <strong>decisiones finales y determinantes</strong> 
              sobre los siguientes fines y medios esenciales?
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>a)</strong> El propósito o los fines para los cuales se tratarán los datos (el "porqué")</li>
                <li><strong>b)</strong> Qué datos personales específicos se recolectarán y tratarán</li>
                <li><strong>c)</strong> A qué categorías de personas se refieren los datos</li>
                <li><strong>d)</strong> Si los datos se comunicarán o cederán y a quién</li>
                <li><strong>e)</strong> Por cuánto tiempo se conservarán los datos personales</li>
              </ul>
            </div>

            <AnswerButton onClick={() => handleAnswer('q3_1', 'si')}>
              SÍ - Decidimos sobre todos estos aspectos
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_1', 'no')} variant="secondary">
              NO - No decidimos sobre estos aspectos
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q3_1', 'nose')} variant="warning">
              NO SÉ - No estoy seguro de quién decide
            </AnswerButton>
            
            {showFactors && (
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold mb-4 text-yellow-800">Factores de Ayuda para Determinar su Rol:</h3>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-green-50 p-3 rounded">
                    <h4 className="font-semibold text-green-800 mb-2">Indicadores de Responsable:</h4>
                    <ul className="text-green-700 space-y-1">
                      <li>• Obtiene beneficio más allá del pago por servicio</li>
                      <li>• Los titulares son sus empleados/clientes/miembros</li>
                      <li>• El tratamiento es natural a su rol profesional</li>
                      <li>• Tiene autonomía completa sobre el procesamiento</li>
                      <li>• Ha confiado datos a terceros para procesar</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="font-semibold text-blue-800 mb-2">Indicadores de Encargado:</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Procesa según instrucciones de terceros</li>
                      <li>• No tiene propósito propio en el tratamiento</li>
                      <li>• Otra parte monitorea sus actividades</li>
                      <li>• Es contratado para actividades específicas</li>
                      <li>• Actúa como sub-encargado de otro procesador</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-3 text-sm text-yellow-700">
                  Después de revisar estos factores, regrese a responder la pregunta principal.
                </p>
              </div>
            )}
          </ModuleCard>
        );

      case 'q3_2':
        return (
          <ModuleCard 
            moduleNumber="3"
            title="Determinación Factual - Especificación del Rol"
            icon={FileText}
          >
            <BackButton onClick={() => setCurrentStep('q3_1')} />
            <p className="text-gray-700 mb-6">
              Si respondió "NO" a la pregunta anterior, ¿cuál de estas afirmaciones describe mejor su rol?
            </p>
            
            <AnswerButton 
              onClick={() => handleAnswer('q3_2', 'opcionA')} 
              variant="option"
            >
              <strong>Opción A:</strong> "Actúo por cuenta de otra organización, siguiendo sus instrucciones, 
              pero tomo decisiones sobre ciertos medios no esenciales (ej. qué sistemas de TI o medidas técnicas 
              específicas usar para el tratamiento, basándome en los objetivos generales de seguridad definidos 
              por la otra parte)."
            </AnswerButton>
            
            <AnswerButton 
              onClick={() => handleAnswer('q3_2', 'opcionB')} 
              variant="option"
            >
              <strong>Opción B:</strong> "Actúo por cuenta de otra organización y únicamente de acuerdo con sus 
              instrucciones. No tomo ninguna decisión sobre los fines y medios del tratamiento por mi cuenta."
            </AnswerButton>
          </ModuleCard>
        );

      case 'q5_1':
        return (
          <ModuleCard 
            moduleNumber="5"
            title="Evaluación de Corresponsabilidad (Controladores Conjuntos)"
            icon={Users}
            helpText="Un indicador clave es si el tratamiento sería imposible sin la participación de ambas partes, de modo que sus roles son inseparables o están inextricablemente vinculados."
          >
            <BackButton onClick={() => setCurrentStep('q3_1')} />
            <p className="text-gray-700 mb-6">
              ¿Usted y la(s) otra(s) parte(s) involucrada(s) <strong>determinan conjuntamente</strong> los fines 
              y medios del tratamiento? Es decir, ¿más de una parte tiene una influencia decisiva sobre el porqué 
              y el cómo del tratamiento, ya sea a través de una decisión común o de decisiones convergentes que se 
              complementan y son necesarias para que el tratamiento se lleve a cabo?
            </p>
            <AnswerButton onClick={() => handleAnswer('q5_1', 'si')}>
              SÍ - Determinamos conjuntamente fines y medios
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q5_1', 'no')} variant="secondary">
              NO - Solo nosotros determinamos fines y medios
            </AnswerButton>
          </ModuleCard>
        );

      case 'q5_2':
        return (
          <ModuleCard 
            moduleNumber="5"
            title="Evaluación de Corresponsabilidad - Alcance"
            icon={Users}
          >
            <BackButton onClick={() => setCurrentStep('q5_1')} />
            <p className="text-gray-700 mb-6">
              Las decisiones comunes o convergentes sobre los fines y medios, ¿se relacionan con la 
              <strong> totalidad de la actividad de tratamiento</strong> en cuestión?
            </p>
            <AnswerButton onClick={() => handleAnswer('q5_2', 'si')}>
              SÍ - Se relacionan con toda la actividad de tratamiento
            </AnswerButton>
            <AnswerButton onClick={() => handleAnswer('q5_2', 'no')} variant="secondary">
              NO - Solo con etapas o fases específicas del tratamiento
            </AnswerButton>
          </ModuleCard>
        );

      // Conclusiones
      case 'conclusion_unico':
        return (
          <ConclusionCard 
            title="RESPONSABLE ÚNICO DEL TRATAMIENTO" 
            type="success"
            recommendation="Usted es el Responsable Único del Tratamiento (Controlador). Su organización es la única que decide sobre los fines y medios del tratamiento, y por tanto, asume la totalidad de las obligaciones y responsabilidades establecidas en la Ley 21.719."
          >
            <p>
              Su organización es la única entidad involucrada en esta actividad de tratamiento de datos personales. 
              Por tanto, usted tiene el control completo y exclusivo sobre los fines y medios del tratamiento.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_legal_explicito':
        return (
          <ConclusionCard 
            title="RESPONSABLE POR DESIGNACIÓN LEGAL EXPLÍCITA" 
            type="info"
            recommendation="Usted es el Responsable del Tratamiento para esta actividad específica, por designación legal explícita. Debe cumplir con todas las obligaciones que la ley le impone a dicho rol. Si otras entidades también están involucradas, podría existir corresponsabilidad, por lo que se recomienda analizar el Módulo 5."
          >
            <p>
              La ley designa explícitamente a su organización como Responsable (Controlador) para esta actividad 
              específica de tratamiento de datos personales.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_legal_implicito':
        return (
          <ConclusionCard 
            title="RESPONSABLE POR DESIGNACIÓN LEGAL IMPLÍCITA" 
            type="info"
            recommendation="Usted es el Responsable del Tratamiento necesario para ejecutar esta tarea, por designación legal implícita. Debe cumplir con todas las obligaciones de dicho rol. Si otras entidades también están involucradas, podría existir corresponsabilidad, por lo que se recomienda analizar el Módulo 5."
          >
            <p>
              El tratamiento de datos es estrictamente necesario para llevar a cabo una tarea o cumplir una 
              obligación que la ley le asigna a su organización, lo que le convierte en Responsable por mandato legal.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_encargado':
        return (
          <ConclusionCard 
            title="TERCERO MANDATARIO O ENCARGADO (PROCESADOR)" 
            type="success"
            recommendation="Su rol es el de Tercero Mandatario o Encargado (Procesador) del tratamiento. Su organización está al servicio del Responsable y debe regirse por un contrato que cumpla con el Artículo 15 bis de la Ley 21.719. No puede usar los datos para fines propios."
          >
            <p>
              Su organización actúa por cuenta de otra entidad, siguiendo sus instrucciones para el tratamiento 
              de datos personales. No tiene control sobre los fines del tratamiento y su rol es de servicio.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_responsable_unico':
        return (
          <ConclusionCard 
            title="RESPONSABLE ÚNICO DEL TRATAMIENTO" 
            type="success"
            recommendation="Usted es el Responsable Único del Tratamiento. Las otras partes involucradas son probablemente responsables independientes para sus propios fines, o bien son sus Encargados (Procesadores) si actúan por cuenta suya."
          >
            <p>
              Aunque hay otras entidades involucradas, usted es quien determina de forma independiente los fines 
              y medios esenciales del tratamiento. Las otras partes no participan en estas decisiones fundamentales.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_corresponsable_total':
        return (
          <ConclusionCard 
            title="CORRESPONSABLES DEL TRATAMIENTO (CONTROLADORES CONJUNTOS)" 
            type="warning"
            recommendation="Usted y la(s) otra(s) parte(s) son Corresponsables del Tratamiento (Controladores Conjuntos) para toda la operación. Deben establecer un acuerdo, de conformidad con el Artículo 26 del RGPD (cuya lógica inspira la ley chilena), que determine de manera transparente sus respectivas responsabilidades."
          >
            <p>
              Usted y las otras entidades involucradas determinan conjuntamente los fines y medios de toda la 
              actividad de tratamiento. Esto requiere un acuerdo formal de corresponsabilidad.
            </p>
          </ConclusionCard>
        );

      case 'conclusion_corresponsable_fases':
        return (
          <ConclusionCard 
            title="CORRESPONSABLES POR FASES (ENFOQUE MODULAR)" 
            type="warning"
            recommendation="Usted y la(s) otra(s) parte(s) son Corresponsables del Tratamiento únicamente para las etapas del tratamiento en las que determinan conjuntamente los fines y medios. Para las operaciones anteriores o posteriores en las que usted decide solo, es un Responsable Único. Este es un 'enfoque por fases'."
          >
            <p>
              La corresponsabilidad aplica solo para etapas específicas del tratamiento donde toman decisiones 
              conjuntas. Para otras fases donde usted decide independientemente, actúa como Responsable Único.
            </p>
          </ConclusionCard>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container mx-auto">
        {renderStep()}
      </div>
    </div>
  );
};

export default CuestionarioCEPD;