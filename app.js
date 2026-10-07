const app = document.querySelector('#app');
const toast = document.querySelector('#toast');
const backdrop = document.querySelector('#modal-backdrop');
const mobileNav = document.querySelector('#mobile-nav');
const menuToggle = document.querySelector('#menu-toggle');
const themeToggle = document.querySelector('#theme-toggle');
const languageSelect = document.querySelector('#language-select');

const email = 'nicolasantoniocostanza@gmail.com';
const supportedLanguages = ['en', 'es', 'pt'];
let currentLanguage = supportedLanguages.includes(localStorage.getItem('portfolio-language')) ? localStorage.getItem('portfolio-language') : 'en';

const htmlDictionary = {
  'overview.lead': {
    en: '<strong>7+ years</strong> architecting mission-critical platforms at <strong>Mercado Libre</strong>. Specializing in high-throughput microfrontends, zero-trust authentication serving <strong>50M+ MAU</strong>, and autonomous AI-native engineering workflows with Claude Code and Model Context Protocol.',
    es: '<strong>7+ años</strong> diseñando plataformas críticas en <strong>Mercado Libre</strong>. Especializado en microfrontends de alto rendimiento, autenticación zero-trust para <strong>50M+ MAU</strong> y flujos de ingeniería autónomos nativos de IA con Claude Code y Model Context Protocol.',
    pt: '<strong>7+ anos</strong> projetando plataformas críticas no <strong>Mercado Libre</strong>. Especializado em microfrontends de alta performance, autenticação zero-trust servindo <strong>50M+ MAU</strong> e fluxos de engenharia autônomos nativos de IA com Claude Code e Model Context Protocol.',
  },
  'experience.meli.summary': {
    en: "Leading frontend architecture and zero-trust auth microfrontends for Latin America's largest e-commerce platform serving 50M+ MAU with zero tolerance for systemic auth failure.",
    es: 'Liderando la arquitectura frontend y microfrontends de autenticación zero-trust para la plataforma de e-commerce más grande de Latinoamérica, sirviendo 50M+ MAU con tolerancia cero a fallas sistémicas de autenticación.',
    pt: 'Liderando a arquitetura frontend e microfrontends de autenticação zero-trust para a maior plataforma de e-commerce da América Latina, servindo 50M+ MAU com tolerância zero a falhas sistêmicas de autenticação.',
  },
};

const dictionary = {
  // Header, navigation & footer
  'Senior Engineer & AI Architect': ['Ingeniero Senior y Arquitecto de IA', 'Engenheiro Sênior e Arquiteto de IA'],
  'Senior Software Engineer': ['Ingeniero de Software Senior', 'Engenheiro de Software Sênior'],
  Overview: ['Resumen', 'Visão geral'],
  Experience: ['Experiencia', 'Experiência'],
  'AI Lab & Projects': ['AI Lab y Proyectos', 'AI Lab e Projetos'],
  'Stack & Architecture': ['Stack y Arquitectura', 'Stack e Arquitetura'],
  Education: ['Formación', 'Educação'],
  Contact: ['Contacto', 'Contato'],
  'Download CV': ['Descargar CV', 'Baixar CV'],
  Navigation: ['Navegación', 'Navegação'],
  'Connect & Telemetry': ['Contacto y telemetría', 'Contato e telemetria'],
  'GitHub Repository': ['Repositorio de GitHub', 'Repositório do GitHub'],
  'LinkedIn Network': ['Red de LinkedIn', 'Rede do LinkedIn'],
  'Encrypted Mail': ['Email cifrado', 'Email criptografado'],
  'Contact Channel': ['Canal de contacto', 'Canal de contato'],
  '© 2026 Nicolás Costanza. All rights reserved.': ['© 2026 Nicolás Costanza. Todos los derechos reservados.', '© 2026 Nicolás Costanza. Todos os direitos reservados.'],
  'Built with vanilla HTML, CSS & JavaScript · Rosario & Remote': ['Construido con HTML, CSS y JavaScript · Rosario y remoto', 'Construído com HTML, CSS e JavaScript · Rosario e remoto'],
  'Senior software engineer building resilient web platforms, AI-native development workflows and high-leverage systems from Rosario, Argentina.': ['Ingeniero de software senior construyendo plataformas web resilientes, flujos de desarrollo nativos de IA y sistemas de alto impacto desde Rosario, Argentina.', 'Engenheiro de software sênior construindo plataformas web resilientes, fluxos de desenvolvimento nativos de IA e sistemas de alto impacto em Rosario, Argentina.'],

  // Overview
  'Open to Staff IC & AI Architect Roles · Remote / Hybrid': ['Abierto a roles Staff IC y Arquitecto de IA · Remoto / Híbrido', 'Aberto a posições Staff IC e Arquiteto de IA · Remoto / Híbrido'],
  'Senior Software Engineer &': ['Ingeniero de Software Senior y', 'Engenheiro de Software Sênior e'],
  'AI Architect': ['Arquitecto de IA', 'Arquiteto de IA'],
  'Download Resume': ['Descargar CV', 'Baixar CV'],
  'Get in Touch': ['Contactame', 'Entrar em contato'],
  'View Full Experience': ['Ver experiencia completa', 'Ver experiência completa'],
  'Copy Email': ['Copiar email', 'Copiar email'],
  'Email copied to clipboard': ['Email copiado al portapapeles', 'Email copiado para a área de transferência'],
  'Engineering Experience': ['Experiencia profesional', 'Experiência profissional'],
  'Users in Production': ['Usuarios en producción', 'Usuários em produção'],
  'Auth & Core Frontend': ['Auth y frontend core', 'Auth e frontend core'],
  'MCP & Agentic SDD': ['MCP y SDD agéntico', 'MCP e SDD agêntico'],
  'Track Record & Impact': ['Trayectoria e impacto', 'Trajetória e impacto'],
  'Featured Engineering Leadership': ['Liderazgo de ingeniería destacado', 'Liderança de engenharia em destaque'],
  'Explore experience details': ['Explorar detalles de experiencia', 'Explorar detalhes da experiência'],
  'AI Lab & Architecture': ['AI Lab y arquitectura', 'AI Lab e arquitetura'],
  'Enterprise Systems': ['Sistemas enterprise', 'Sistemas enterprise'],
  'Mission-Critical Auth & Microfrontends': ['Autenticación crítica y microfrontends', 'Autenticação crítica e microfrontends'],
  "Overhauled Latin America's highest-volume fintech and e-commerce authentication ecosystem. Rolled out Google One Tap, biometric WebAuthn and decoupled microfrontend modules serving 50M+ active users.": ['Renové el ecosistema de autenticación fintech y e-commerce de mayor volumen de Latinoamérica. Implementé Google One Tap, WebAuthn biométrico y módulos de microfrontends desacoplados que sirven a 50M+ usuarios activos.', 'Reformulei o ecossistema de autenticação fintech e e-commerce de maior volume da América Latina. Implementei Google One Tap, WebAuthn biométrico e módulos de microfrontends desacoplados servindo 50M+ usuários ativos.'],
  'AI-Native Engineering & MCP Workflows': ['Ingeniería nativa de IA y workflows MCP', 'Engenharia nativa de IA e workflows MCP'],
  'Pioneered Specification-Driven Development and custom Model Context Protocol servers. Agent-assisted workflows with Claude Code and Codex condensed discovery and implementation cycles by 3.2x.': ['Impulsé el desarrollo guiado por especificaciones y servidores MCP propios. Los flujos asistidos por agentes con Claude Code y Codex redujeron los ciclos de descubrimiento e implementación 3.2x.', 'Impulsionei o desenvolvimento guiado por especificações e servidores MCP próprios. Fluxos assistidos por agentes com Claude Code e Codex reduziram os ciclos de descoberta e implementação em 3.2x.'],
  'Scalable Fintech Wallets & Core Systems': ['Wallets fintech escalables y sistemas core', 'Wallets fintech escaláveis e sistemas core'],
  'Built end-to-end payment platforms, virtual card onboarding and real-time ledger sync across web and mobile with strict type-safe schemas and multi-country compliance workflows.': ['Construí plataformas de pago end-to-end, onboarding de tarjetas virtuales y sincronización de ledger en tiempo real en web y mobile, con esquemas type-safe estrictos y flujos de compliance multi-país.', 'Construí plataformas de pagamento end-to-end, onboarding de cartões virtuais e sincronização de ledger em tempo real na web e no mobile, com schemas type-safe estritos e fluxos de compliance multi-país.'],
  'ATS & Technical Competencies': ['ATS y competencias técnicas', 'ATS e competências técnicas'],
  'Technical Stack & Specialization': ['Stack técnico y especialización', 'Stack técnico e especialização'],
  'Languages & Core Tech': ['Lenguajes y tecnología core', 'Linguagens e tecnologia core'],
  'Deep expertise in modern JavaScript and TypeScript runtimes with high-performance backend tools.': ['Experiencia profunda en runtimes modernos de JavaScript y TypeScript con herramientas backend de alto rendimiento.', 'Experiência profunda em runtimes modernos de JavaScript e TypeScript com ferramentas backend de alta performance.'],
  'Architecture & Scale': ['Arquitectura y escala', 'Arquitetura e escala'],
  'Resilient distributed frontends and authentication security models designed for autonomous teams.': ['Frontends distribuidos resilientes y modelos de seguridad de autenticación diseñados para equipos autónomos.', 'Frontends distribuídos resilientes e modelos de segurança de autenticação projetados para equipes autônomas.'],
  'AI-Native & Agentic': ['IA nativa y agéntica', 'IA nativa e agêntica'],
  'Agentic workflows that elevate software engineering throughput, precision and verifiability.': ['Flujos agénticos que elevan el rendimiento, la precisión y la verificabilidad de la ingeniería de software.', 'Fluxos agênticos que elevam a produtividade, a precisão e a verificabilidade da engenharia de software.'],
  'Recruiter & architectural inquiries': ['Consultas de recruiters y arquitectura', 'Consultas de recrutadores e arquitetura'],
  'Hiring for a Senior IC or AI Architect role?': ['¿Buscás un Senior IC o Arquitecto de IA?', 'Procurando um Senior IC ou Arquiteto de IA?'],
  'Open to leadership conversations, staff engineering challenges and building next-generation web and AI systems.': ['Abierto a conversaciones de liderazgo, desafíos de ingeniería staff y a construir sistemas web y de IA de nueva generación.', 'Aberto a conversas de liderança, desafios de engenharia staff e a construir sistemas web e de IA de nova geração.'],
  'Schedule Interview': ['Agendar entrevista', 'Agendar entrevista'],

  // Experience view
  'Career Timeline & Track Record': ['Trayectoria profesional', 'Trajetória profissional'],
  '7+ years architecting scalable web ecosystems, mission-critical authentication at Mercado Libre and AI-native delivery workflows across Latin America and global markets.': ['7+ años diseñando ecosistemas web escalables, autenticación crítica en Mercado Libre y flujos de entrega nativos de IA en Latinoamérica y mercados globales.', '7+ anos projetando ecossistemas web escaláveis, autenticação crítica no Mercado Libre e fluxos de entrega nativos de IA na América Latina e mercados globais.'],
  Scale: ['Escala', 'Escala'],
  Domain: ['Dominio', 'Domínio'],
  Mobility: ['Movilidad', 'Mobilidade'],
  'Years · Full-stack & systems': ['Años · Full-stack y sistemas', 'Anos · Full-stack e sistemas'],
  'MAU · Users served at MELI': ['MAU · Usuarios servidos en MELI', 'MAU · Usuários atendidos no MELI'],
  'Auth · Zero-trust ecosystem': ['Auth · Ecosistema zero-trust', 'Auth · Ecossistema zero-trust'],
  'US/EU overlap & hybrid': ['Solapamiento US/EU e híbrido', 'Sobreposição US/EU e híbrido'],
  'All Experiences': ['Todas las experiencias', 'Todas as experiências'],
  'Download PDF CV': ['Descargar CV en PDF', 'Baixar CV em PDF'],
  'Current Role': ['Rol actual', 'Cargo atual'],
  'Rosario / Buenos Aires · Full-time / Remote': ['Rosario / Buenos Aires · Full-time / Remoto', 'Rosario / Buenos Aires · Full-time / Remoto'],
  'Aug 2023 – Present': ['Ago 2023 – Presente', 'Ago 2023 – Presente'],
  'Mar 2023 – Aug 2023': ['Mar 2023 – Ago 2023', 'Mar 2023 – Ago 2023'],
  'Smart Energy & Utilities': ['Energía y utilities inteligentes', 'Energia e utilities inteligentes'],
  'Fintech & Enterprise': ['Fintech y enterprise', 'Fintech e enterprise'],
  'Key Impact & Technical Execution': ['Impacto clave y ejecución técnica', 'Impacto principal e execução técnica'],
  'Technologies:': ['Tecnologías:', 'Tecnologias:'],
  'Auth Ecosystem & Microfrontends': ['Ecosistema de autenticación y microfrontends', 'Ecossistema de autenticação e microfrontends'],
  'Architected decoupled login and account recovery micro-apps via Module Federation, reducing deployment blast radius across distributed squads.': ['Diseñé micro-apps desacopladas de login y recuperación de cuenta con Module Federation, reduciendo el radio de impacto de cada despliegue entre squads distribuidas.', 'Projetei micro-apps desacopladas de login e recuperação de conta com Module Federation, reduzindo o raio de impacto de cada deploy entre squads distribuídas.'],
  'Google Sign-In & Canary Rollouts': ['Google Sign-In y rollouts canary', 'Google Sign-In e rollouts canary'],
  'Engineered OAuth2 Google Identity federation with graduated canary deployments and Datadog monitors that halt delivery on latency anomalies.': ['Implementé la federación OAuth2 con Google Identity con despliegues canary graduales y monitores Datadog que detienen la entrega ante anomalías de latencia.', 'Implementei a federação OAuth2 com Google Identity com deploys canary graduais e monitores Datadog que interrompem a entrega diante de anomalias de latência.'],
  'TypeScript Migration (-42% Runtime Exceptions)': ['Migración a TypeScript (-42% de excepciones en runtime)', 'Migração para TypeScript (-42% de exceções em runtime)'],
  'Standardized strict end-to-end schemas across legacy JavaScript repositories, decreasing production runtime crashes and auth payload regressions.': ['Estandaricé esquemas estrictos end-to-end en repositorios legacy de JavaScript, reduciendo crashes en producción y regresiones en payloads de autenticación.', 'Padronizei schemas estritos end-to-end em repositórios legacy de JavaScript, reduzindo crashes em produção e regressões em payloads de autenticação.'],
  'AI-Native Engineering (3x Delivery Acceleration)': ['Ingeniería nativa de IA (3x de aceleración de entrega)', 'Engenharia nativa de IA (3x de aceleração de entrega)'],
  'Pioneered Specification-Driven Development backed by internal MCP servers with Claude Code to streamline generation, fixtures and architecture RFCs.': ['Impulsé el desarrollo guiado por especificaciones con servidores MCP internos y Claude Code para agilizar generación, fixtures y RFCs de arquitectura.', 'Impulsionei o desenvolvimento guiado por especificações com servidores MCP internos e Claude Code para agilizar geração, fixtures e RFCs de arquitetura.'],
  'High-Reusability White-Label React Native Architecture': ['Arquitectura React Native white-label altamente reutilizable', 'Arquitetura React Native white-label altamente reutilizável'],
  'Constructed a multi-tenant client foundation for dynamic branding swaps, configurable payment gateways and tenant-specific billing modules.': ['Construí una base multi-tenant para cambios dinámicos de marca, pasarelas de pago configurables y módulos de facturación por cliente.', 'Construí uma base multi-tenant para trocas dinâmicas de marca, gateways de pagamento configuráveis e módulos de faturamento por cliente.'],
  'Offline-First Synchronization Engine': ['Motor de sincronización offline-first', 'Motor de sincronização offline-first'],
  'Implemented optimistic state caching with Redux Toolkit and SQLite persistence for responsive meter readings under intermittent network conditions.': ['Implementé caché optimista con Redux Toolkit y persistencia SQLite para lecturas de medidores bajo conectividad intermitente.', 'Implementei cache otimista com Redux Toolkit e persistência SQLite para leituras de medidores sob conectividade intermitente.'],
  'Fintech Digital Wallet (Qira Pagos)': ['Wallet digital fintech (Qira Pagos)', 'Wallet digital fintech (Qira Pagos)'],
  'Built real-time transaction processing, CVU payment gateways and banking webhook ingress with strict idempotency keys and zero ledger reconciliation discrepancies.': ['Construí procesamiento de transacciones en tiempo real, pasarelas de pago CVU e ingreso de webhooks bancarios con idempotencia estricta y cero discrepancias de conciliación.', 'Construí processamento de transações em tempo real, gateways de pagamento CVU e ingress de webhooks bancários com idempotência estrita e zero discrepâncias de conciliação.'],
  'Scalable B2B Backoffice & Document Pipeline': ['Backoffice B2B escalable y pipeline de documentos', 'Backoffice B2B escalável e pipeline de documentos'],
  'Developed RBAC backoffices, multi-currency catalog filtering and pre-signed S3 streaming for legal agricultural grain contracts.': ['Desarrollé backoffices con RBAC, filtrado de catálogo multi-moneda y streaming S3 pre-firmado para contratos legales de granos.', 'Desenvolvi backoffices com RBAC, filtragem de catálogo multi-moeda e streaming S3 pré-assinado para contratos legais de grãos.'],
  'Performance, Observability & JWT Security': ['Performance, observabilidad y seguridad JWT', 'Performance, observabilidade e segurança JWT'],
  'Decreased MTTD by 60% with automated Sentry releases and source maps while deploying cryptographic JWT refresh rotation across Node microservices.': ['Reduje el MTTD un 60% con releases automatizados de Sentry y source maps, desplegando rotación criptográfica de JWT en microservicios Node.', 'Reduzi o MTTD em 60% com releases automatizados do Sentry e source maps, implantando rotação criptográfica de JWT em microsserviços Node.'],
  'Immediate impact opportunity': ['Oportunidad de impacto inmediato', 'Oportunidade de impacto imediato'],
  'Looking for a Senior IC or Tech Lead?': ['¿Buscás un Senior IC o Tech Lead?', 'Procurando um Senior IC ou Tech Lead?'],
  'Available for senior engineering, staff frontend and AI architecture roles in distributed international teams.': ['Disponible para roles senior de ingeniería, frontend staff y arquitectura de IA en equipos internacionales distribuidos.', 'Disponível para posições sênior de engenharia, frontend staff e arquitetura de IA em equipes internacionais distribuídas.'],
  'Download Full CV (PDF)': ['Descargar CV completo (PDF)', 'Baixar CV completo (PDF)'],
  'Schedule Intro Call': ['Agendar llamada inicial', 'Agendar chamada inicial'],

  // AI Lab
  'Portfolio & System Builds': ['Portafolio y builds de sistema', 'Portfólio e builds de sistema'],
  'Featured Projects & AI Lab': ['Proyectos destacados y AI Lab', 'Projetos em destaque e AI Lab'],
  'Curated selection of production-grade architectures, autonomous agent workflows and mission-critical applications engineered for deterministic resilience.': ['Selección curada de arquitecturas de producción, flujos de agentes autónomos y aplicaciones críticas diseñadas para una resiliencia determinista.', 'Seleção curada de arquiteturas de produção, fluxos de agentes autônomos e aplicações críticas projetadas para resiliência determinística.'],
  'Runtime Uptime': ['Uptime de runtime', 'Uptime de runtime'],
  'Production Specs': ['Specs en producción', 'Specs em produção'],
  'Engine Profile': ['Perfil de ingeniería', 'Perfil de engenharia'],
  'All Projects': ['Todos los proyectos', 'Todos os projetos'],
  'AI-Native & MCP': ['IA nativa y MCP', 'IA nativa e MCP'],
  'Enterprise Microfrontends': ['Microfrontends enterprise', 'Microfrontends enterprise'],
  'Fintech & Mobile': ['Fintech y mobile', 'Fintech e mobile'],
  'AI-Native · MCP Protocol · Automation': ['IA nativa · Protocolo MCP · Automatización', 'IA nativa · Protocolo MCP · Automação'],
  '3.2x faster delivery': ['3.2x más rápido en entrega', '3.2x mais rápido na entrega'],
  'Agentic Dev Framework & MCP Suite': ['Framework de desarrollo agéntico y suite MCP', 'Framework de desenvolvimento agêntico e suíte MCP'],
  'Custom Model Context Protocol toolchain orchestrating Claude Code and Codex for AST refactoring, spec-based code generation and automated verification loops.': ['Toolchain de Model Context Protocol que orquesta Claude Code y Codex para refactorización AST, generación de código basada en specs y loops de verificación automatizados.', 'Toolchain de Model Context Protocol que orquestra Claude Code e Codex para refatoração AST, geração de código baseada em specs e loops de verificação automatizados.'],
  'View Architecture Breakdown': ['Ver desglose de arquitectura', 'Ver detalhamento da arquitetura'],
  'Enterprise Scale · Zero-Downtime': ['Escala enterprise · Zero-downtime', 'Escala enterprise · Zero-downtime'],
  'Microfrontend Auth Engine': ['Motor de autenticación con microfrontends', 'Motor de autenticação com microfrontends'],
  'Decoupled authentication architecture handling OAuth 2.0, WebAuthn biometric login and multi-tenant session handoffs across millions of concurrent users.': ['Arquitectura de autenticación desacoplada que maneja OAuth 2.0, login biométrico WebAuthn y traspaso de sesiones multi-tenant para millones de usuarios concurrentes.', 'Arquitetura de autenticação desacoplada que lida com OAuth 2.0, login biométrico WebAuthn e handoff de sessões multi-tenant para milhões de usuários simultâneos.'],
  'Explore Architecture': ['Explorar arquitectura', 'Explorar arquitetura'],
  'Compiler & Agent Pipeline': ['Pipeline de compilador y agente', 'Pipeline de compilador e agente'],
  '3-Agent Linting': ['Linting con 3 agentes', 'Linting com 3 agentes'],
  'SDD Compiler Engine': ['Motor compilador SDD', 'Motor compilador SDD'],
  'Deterministic workflow compiler turning structured Markdown specifications into verified TypeScript codebases with adversarial linting and invariant testing.': ['Compilador determinista que transforma especificaciones Markdown estructuradas en codebases TypeScript verificados con linting adversarial y pruebas de invariantes.', 'Compilador determinístico que transforma especificações Markdown estruturadas em codebases TypeScript verificados com linting adversarial e testes de invariantes.'],
  'Explore Specification': ['Explorar especificación', 'Explorar especificação'],
  'Fintech & Ledger': ['Fintech y ledger', 'Fintech e ledger'],
  'ACID Guaranteed': ['ACID garantizado', 'ACID garantido'],
  'End-to-end digital wallet with virtual card onboarding, immutable double-entry ledgers, banking integrations and multi-currency exchange pipelines.': ['Wallet digital end-to-end con onboarding de tarjetas virtuales, ledger inmutable de doble entrada, integraciones bancarias y pipelines de cambio multi-moneda.', 'Wallet digital end-to-end com onboarding de cartões virtuais, ledger imutável de partidas dobradas, integrações bancárias e pipelines de câmbio multi-moeda.'],
  'System Topology': ['Topología del sistema', 'Topologia do sistema'],
  'Mobile Architecture': ['Arquitectura mobile', 'Arquitetura mobile'],
  '42+ Distributed Tenants': ['42+ tenants distribuidos', '42+ tenants distribuídos'],
  'White-Label Smart Metering': ['Smart metering white-label', 'Smart metering white-label'],
  'Scalable React Native architecture for utility smart-metering companies across Latin America with compile-time branding tokens and dynamic IoT feeds.': ['Arquitectura React Native escalable para empresas de smart metering en Latinoamérica, con tokens de marca en tiempo de compilación y feeds IoT dinámicos.', 'Arquitetura React Native escalável para empresas de smart metering na América Latina, com tokens de marca em tempo de compilação e feeds IoT dinâmicos.'],
  'View Case Study': ['Ver caso de estudio', 'Ver estudo de caso'],
  'System Verification & Engineering Standards': ['Verificación de sistemas y estándares de ingeniería', 'Verificação de sistemas e padrões de engenharia'],
  'Strict quality assurance benchmarks applied across production systems and autonomous AI pipelines.': ['Benchmarks estrictos de calidad aplicados en sistemas de producción y pipelines autónomos de IA.', 'Benchmarks estritos de qualidade aplicados em sistemas de produção e pipelines autônomos de IA.'],
  'TYPE SAFETY': ['SEGURIDAD DE TIPOS', 'SEGURANÇA DE TIPOS'],
  '100% Strict': ['100% estricto', '100% estrito'],
  'Zero unsafe escapes in production codebases.': ['Cero escapes inseguros en codebases de producción.', 'Zero escapes inseguros em codebases de produção.'],
  'E2E DETERMINISM': ['DETERMINISMO E2E', 'DETERMINISMO E2E'],
  '<0.01% Drift': ['<0.01% de desvío', '<0.01% de desvio'],
  'Autonomous regression tests on each AST emit.': ['Tests de regresión autónomos en cada emisión de AST.', 'Testes de regressão autônomos a cada emissão de AST.'],
  'SECURITY AUDIT': ['AUDITORÍA DE SEGURIDAD', 'AUDITORIA DE SEGURANÇA'],
  'Automated SAST and secret scanning on CI push.': ['SAST automatizado y escaneo de secretos en cada push de CI.', 'SAST automatizado e varredura de segredos a cada push de CI.'],
  'LATENCY P99': ['LATENCIA P99', 'LATÊNCIA P99'],
  'Federated edge distribution nodes.': ['Nodos de distribución federada en el edge.', 'Nós de distribuição federada no edge.'],
  'AI Interactive Sandbox Terminal': ['Terminal sandbox interactiva de IA', 'Terminal sandbox interativo de IA'],
  "Live simulation of Nicolás's MCP agent executing task-spec parsing and validation loops.": ['Simulación en vivo del agente MCP de Nicolás ejecutando parsing de specs y loops de validación.', 'Simulação ao vivo do agente MCP de Nicolás executando parsing de specs e loops de validação.'],
  'Execute Agent Loop': ['Ejecutar loop del agente', 'Executar loop do agente'],
  Clear: ['Limpiar', 'Limpar'],
  '// Target SDD Spec': ['// Spec SDD objetivo', '// Spec SDD alvo'],
  'Construct an idempotent payment middleware with Redis TTL lock and Prometheus telemetry export.': ['Construir un middleware de pagos idempotente con lock TTL en Redis y export de telemetría a Prometheus.', 'Construir um middleware de pagamentos idempotente com lock TTL no Redis e export de telemetria para Prometheus.'],
  Guardrail: ['Guardarraíl', 'Guardrail'],
  'Human approval before write': ['Aprobación humana antes de escribir', 'Aprovação humana antes de escrever'],
  '> Ready for instructions. Click "Execute Agent Loop" above.': ['> Listo para instrucciones. Hacé clic en "Ejecutar loop del agente".', '> Pronto para instruções. Clique em "Executar loop do agente".'],
  'Want to review architectural designs or code samples?': ['¿Querés revisar diseños arquitectónicos o muestras de código?', 'Quer revisar designs arquiteturais ou amostras de código?'],
  'Available for senior architectural consultations, lead staff engineer discussions and autonomous AI system design reviews.': ['Disponible para consultorías de arquitectura senior, discusiones de staff engineer y revisiones de diseño de sistemas autónomos de IA.', 'Disponível para consultorias de arquitetura sênior, discussões de staff engineer e revisões de design de sistemas autônomos de IA.'],

  // Stack
  'Technical Capabilities & Proficiency': ['Capacidades y competencias técnicas', 'Capacidades e competências técnicas'],
  'Technical Stack & Architecture': ['Stack técnico y arquitectura', 'Stack técnico e arquitetura'],
  'A transparent breakdown of competencies, engineering standards and production-proven technologies built for enterprise reliability and AI-native velocity.': ['Un desglose transparente de competencias, estándares de ingeniería y tecnologías probadas en producción para confiabilidad enterprise y velocidad nativa de IA.', 'Um detalhamento transparente de competências, padrões de engenharia e tecnologias comprovadas em produção para confiabilidade enterprise e velocidade nativa de IA.'],
  'Skill Matrix': ['Matriz de skills', 'Matriz de skills'],
  Architectures: ['Arquitecturas', 'Arquiteturas'],
  '7+ Years': ['7+ años', '7+ anos'],
  'Production Experience': ['Experiencia en producción', 'Experiência em produção'],
  'Full-Lifecycle Expert': ['Experto full-lifecycle', 'Especialista full-lifecycle'],
  'MCP & SDD': ['MCP y SDD', 'MCP e SDD'],
  'Unified Competence Map': ['Mapa unificado de competencias', 'Mapa unificado de competências'],
  'Production-tested domains': ['Dominios probados en producción', 'Domínios comprovados em produção'],
  'Search across runtime, architecture, AI and reliability capabilities.': ['Buscá entre capacidades de runtime, arquitectura, IA y confiabilidad.', 'Busque entre capacidades de runtime, arquitetura, IA e confiabilidade.'],
  'Search skills': ['Buscar skills', 'Buscar skills'],
  VERIFIED: ['VERIFICADO', 'VERIFICADO'],
  'Key Technologies': ['Tecnologías clave', 'Tecnologias-chave'],
  '↗ Production Context': ['↗ Contexto de producción', '↗ Contexto de produção'],
  'AI-Native & Agentic Systems': ['Sistemas de IA nativa y agénticos', 'Sistemas de IA nativa e agênticos'],
  'Model orchestration, agent tool use, context boundary control and prompt-driven verification workflows.': ['Orquestación de modelos, uso de herramientas por agentes, control de límites de contexto y flujos de verificación guiados por prompts.', 'Orquestração de modelos, uso de ferramentas por agentes, controle de limites de contexto e fluxos de verificação guiados por prompts.'],
  'Spec-Driven Dev': ['Desarrollo guiado por specs', 'Desenvolvimento guiado por specs'],
  'Agent Scaffolding': ['Scaffolding de agentes', 'Scaffolding de agentes'],
  'Built custom MCP servers for code refactoring and automated verification; reduced manual development cycles by 3x.': ['Construí servidores MCP propios para refactorización de código y verificación automatizada; reduje los ciclos manuales de desarrollo 3x.', 'Construí servidores MCP próprios para refatoração de código e verificação automatizada; reduzi os ciclos manuais de desenvolvimento em 3x.'],
  'Languages & Core Runtimes': ['Lenguajes y runtimes core', 'Linguagens e runtimes core'],
  'Type-safe runtime architecture, high-concurrency event loops, asynchronous backends and deterministic computation.': ['Arquitectura de runtime type-safe, event loops de alta concurrencia, backends asincrónicos y cómputo determinista.', 'Arquitetura de runtime type-safe, event loops de alta concorrência, backends assíncronos e computação determinística.'],
  '100% strict TypeScript typing enforced across monorepos and backend boundaries.': ['Tipado estricto de TypeScript al 100% aplicado en monorepos y límites de backend.', 'Tipagem estrita de TypeScript em 100% aplicada em monorepos e fronteiras de backend.'],
  'Frontend & Mobile Systems': ['Sistemas frontend y mobile', 'Sistemas frontend e mobile'],
  'Component graph composition, atomic state stores, cross-platform mobile architecture and modern rendering patterns.': ['Composición de grafos de componentes, stores atómicos, arquitectura mobile multiplataforma y patrones modernos de renderizado.', 'Composição de grafos de componentes, stores atômicos, arquitetura mobile multiplataforma e padrões modernos de renderização.'],
  'Engineered accessible, high-performance UI systems and multi-tenant cross-platform deployments.': ['Ingeniería de sistemas UI accesibles y de alto rendimiento, y despliegues multiplataforma multi-tenant.', 'Engenharia de sistemas UI acessíveis e de alta performance, e deploys multiplataforma multi-tenant.'],
  'Distributed Systems & MFEs': ['Sistemas distribuidos y MFEs', 'Sistemas distribuídos e MFEs'],
  'Decoupled domain architectures, independent runtime module delivery, API gatekeeping and migration orchestration.': ['Arquitecturas de dominio desacopladas, entrega independiente de módulos en runtime, control de APIs y orquestación de migraciones.', 'Arquiteturas de domínio desacopladas, entrega independente de módulos em runtime, controle de APIs e orquestração de migrações.'],
  'Architected zero-dependency microfrontend modules serving 50M+ MAU and enabling autonomous squad releases.': ['Arquitectura de módulos microfrontend sin dependencias sirviendo 50M+ MAU y habilitando releases autónomos por squad.', 'Arquitetura de módulos microfrontend sem dependências servindo 50M+ MAU e habilitando releases autônomos por squad.'],
  'Security, Auth & Persistence': ['Seguridad, auth y persistencia', 'Segurança, auth e persistência'],
  'Biometrics, cryptographic token exchange, distributed session caching and strict data layer modeling.': ['Biometría, intercambio criptográfico de tokens, caché de sesiones distribuidas y modelado estricto de capa de datos.', 'Biometria, troca criptográfica de tokens, cache de sessões distribuídas e modelagem estrita da camada de dados.'],
  'Designed high-throughput identity recovery conduits with deterministic schema guardrails.': ['Diseñé canales de recuperación de identidad de alto rendimiento con guardarraíles deterministas de esquema.', 'Projetei canais de recuperação de identidade de alta performance com guardrails determinísticos de schema.'],
  'Testing, CI/CD & Observability': ['Testing, CI/CD y observabilidad', 'Testes, CI/CD e observabilidade'],
  'Continuous integration pipelines, automated visual regression gates and real-time distributed tracing.': ['Pipelines de integración continua, gates automatizados de regresión visual y tracing distribuido en tiempo real.', 'Pipelines de integração contínua, gates automatizados de regressão visual e tracing distribuído em tempo real.'],
  'Automated quality enforcement stops breaking visual and logic regressions before merge.': ['La aplicación automatizada de calidad detiene regresiones visuales y lógicas antes del merge.', 'A aplicação automatizada de qualidade impede regressões visuais e lógicas antes do merge.'],
  'Production Standards': ['Estándares de producción', 'Padrões de produção'],
  'Operational Benchmarks': ['Benchmarks operativos', 'Benchmarks operacionais'],
  'Metrics validated under heavy multi-region traffic loads': ['Métricas validadas bajo cargas intensas de tráfico multi-región', 'Métricas validadas sob cargas intensas de tráfego multi-região'],
  'TYPE STRICTNESS': ['RIGOR DE TIPOS', 'RIGOR DE TIPAGEM'],
  'Zero unsafe assertions': ['Cero aserciones inseguras', 'Zero asserções inseguras'],
  'MAX USER SCALE': ['ESCALA MÁXIMA DE USUARIOS', 'ESCALA MÁXIMA DE USUÁRIOS'],
  'MAU sustained reliability': ['Confiabilidad sostenida en MAU', 'Confiabilidade sustentada em MAU'],
  'DEV CYCLE REDUCTION': ['REDUCCIÓN DEL CICLO DE DESARROLLO', 'REDUÇÃO DO CICLO DE DESENVOLVIMENTO'],
  'Via custom MCP & SDD tooling': ['Vía tooling propio de MCP y SDD', 'Via tooling próprio de MCP e SDD'],
  'DEPLOYMENT CADENCE': ['CADENCIA DE DEPLOY', 'CADÊNCIA DE DEPLOY'],
  'Zero-downtime canary waves': ['Olas canary sin downtime', 'Ondas canary sem downtime'],
  'Design Ideology': ['Ideología de diseño', 'Ideologia de design'],
  'Architecture Guiding Principles': ['Principios guía de arquitectura', 'Princípios norteadores de arquitetura'],
  'Three strict doctrines applied whenever architecting platforms, scaling engineering groups or leading technical redesigns.': ['Tres doctrinas estrictas aplicadas al diseñar plataformas, escalar equipos de ingeniería o liderar rediseños técnicos.', 'Três doutrinas estritas aplicadas ao projetar plataformas, escalar times de engenharia ou liderar redesenho técnico.'],
  'Specification-Driven Development': ['Desarrollo guiado por especificaciones', 'Desenvolvimento guiado por especificações'],
  'Strict schemas, API contracts and invariant models precede syntax so agents and engineers generate coherent, self-validating modules.': ['Esquemas estrictos, contratos de API y modelos de invariantes preceden a la sintaxis para que agentes e ingenieros generen módulos coherentes y autovalidados.', 'Schemas estritos, contratos de API e modelos de invariantes precedem a sintaxe para que agentes e engenheiros gerem módulos coerentes e autovalidáveis.'],
  'Strict runtime typing with Zod + TypeScript': ['Tipado estricto en runtime con Zod + TypeScript', 'Tipagem estrita em runtime com Zod + TypeScript'],
  'Autonomous Domain Boundaries': ['Límites de dominio autónomos', 'Fronteiras de domínio autônomas'],
  'Systems are compartmentalized into distinct, decoupled domains. Squads deploy independently without blocking global dependencies.': ['Los sistemas se compartimentan en dominios distintos y desacoplados. Las squads despliegan de forma independiente sin bloquear dependencias globales.', 'Os sistemas são compartimentados em domínios distintos e desacoplados. As squads fazem deploy de forma independente sem bloquear dependências globais.'],
  'Module federation with hermetic dependencies': ['Module federation con dependencias herméticas', 'Module federation com dependências herméticas'],
  'Progressive Decoupling & Risk Mitigation': ['Desacople progresivo y mitigación de riesgo', 'Desacoplamento progressivo e mitigação de risco'],
  'Legacy code is replaced safely behind feature flags with automated canary evaluations and fast rollback triggers.': ['El código legacy se reemplaza de forma segura detrás de feature flags con evaluaciones canary automatizadas y rollbacks rápidos.', 'O código legacy é substituído com segurança atrás de feature flags com avaliações canary automatizadas e rollbacks rápidos.'],
  'Canary analysis with telemetry health-checks': ['Análisis canary con health-checks de telemetría', 'Análise canary com health-checks de telemetria'],
  '// Nicolás Costanza — High-Assurance Architectural Guardrails': ['// Nicolás Costanza — Guardarraíles arquitectónicos de alta confiabilidad', '// Nicolás Costanza — Guardrails arquiteturais de alta confiabilidade'],
  'Open to senior engineering & AI architect leadership roles': ['Abierto a roles de liderazgo en ingeniería y arquitectura de IA', 'Aberto a posições de liderança em engenharia e arquitetura de IA'],
  'Ready to scale your technical infrastructure?': ['¿Listo para escalar tu infraestructura técnica?', 'Pronto para escalar sua infraestrutura técnica?'],
  'Available for remote Staff / Principal Frontend, systems architecture and AI-native engineering advisory.': ['Disponible para roles remotos Staff / Principal Frontend, arquitectura de sistemas y asesoría en ingeniería nativa de IA.', 'Disponível para posições remotas Staff / Principal Frontend, arquitetura de sistemas e consultoria em engenharia nativa de IA.'],
  'Initiate Technical Interview': ['Iniciar entrevista técnica', 'Iniciar entrevista técnica'],
  'Download Detailed Resume': ['Descargar CV detallado', 'Baixar CV detalhado'],

  // Education
  'Academic Background & Continuous Learning': ['Formación académica y aprendizaje continuo', 'Formação acadêmica e aprendizado contínuo'],
  'Education & Credentials': ['Formación y credenciales', 'Educação e credenciais'],
  'Formal engineering foundations, specialized AI university curriculum and enterprise-grade distributed systems mastery.': ['Bases formales de ingeniería, currícula universitaria especializada en IA y dominio de sistemas distribuidos de nivel enterprise.', 'Bases formais de engenharia, currículo universitário especializado em IA e domínio de sistemas distribuídos de nível enterprise.'],
  'AI Specialization': ['Especialización en IA', 'Especialização em IA'],
  'Systems Rigor': ['Rigor de sistemas', 'Rigor de sistemas'],
  'Formal Higher Education': ['Educación superior formal', 'Educação superior formal'],
  'Industrial Engineering': ['Ingeniería Industrial', 'Engenharia Industrial'],
  'Core Engineering Disciplines': ['Disciplinas de ingeniería core', 'Disciplinas de engenharia core'],
  'Systems Thinking': ['Pensamiento sistémico', 'Pensamento sistêmico'],
  'Stochastic Analysis': ['Análisis estocástico', 'Análise estocástica'],
  'Operations Optimization': ['Optimización de operaciones', 'Otimização de operações'],
  'Statistical Quality Control': ['Control estadístico de calidad', 'Controle estatístico de qualidade'],
  'Project Governance': ['Gobernanza de proyectos', 'Governança de projetos'],
  'Brings foundational systems-engineering methodology, operational process optimization and quantitative models into distributed software architectures.': ['Aporta metodología de ingeniería de sistemas, optimización de procesos operativos y modelos cuantitativos a arquitecturas de software distribuidas.', 'Traz metodologia de engenharia de sistemas, otimização de processos operacionais e modelos quantitativos para arquiteturas de software distribuídas.'],
  'Technician in Artificial Intelligence': ['Técnico Universitario en Inteligencia Artificial', 'Técnico Universitário em Inteligência Artificial'],
  'Applied AI Coursework': ['Cursada aplicada de IA', 'Formação aplicada em IA'],
  'Neural Architectures': ['Arquitecturas neuronales', 'Arquiteturas neurais'],
  'Supervised / Unsupervised ML': ['ML supervisado / no supervisado', 'ML supervisionado / não supervisionado'],
  'Vector Spaces & RAG': ['Espacios vectoriales y RAG', 'Espaços vetoriais e RAG'],
  'Mathematical Computing': ['Computación matemática', 'Computação matemática'],
  'Agent Orchestration': ['Orquestación de agentes', 'Orquestração de agentes'],
  'Provides formal rigour in mathematical AI foundations, bridging LLM prompting and autonomous agents with mission-critical web application codebases.': ['Aporta rigor formal en fundamentos matemáticos de IA, conectando prompting de LLMs y agentes autónomos con codebases web críticas.', 'Traz rigor formal em fundamentos matemáticos de IA, conectando prompting de LLMs e agentes autônomos com codebases web críticas.'],
  '◉ Recruiter Engineering Insight': ['◉ Insight técnico para recruiters', '◉ Insight técnico para recrutadores'],
  'Dual-Discipline Advantage': ['Ventaja de doble disciplina', 'Vantagem de dupla disciplina'],
  'Industrial Engineering optimization paired with academic Machine Learning engineering': ['Optimización de Ingeniería Industrial combinada con ingeniería académica de Machine Learning', 'Otimização de Engenharia Industrial combinada com engenharia acadêmica de Machine Learning'],
  '8+ Years': ['8+ años', '8+ anos'],
  'Academic Tenure': ['Trayectoria académica', 'Trajetória acadêmica'],
  'Global Teams': ['Equipos globales', 'Equipes globais'],
  'Continuous Learning & Architectural Focus': ['Aprendizaje continuo y foco arquitectónico', 'Aprendizado contínuo e foco arquitetural'],
  'Production Hardened': ['Endurecido en producción', 'Endurecido em produção'],
  'Distributed Systems & Enterprise Architecture': ['Sistemas distribuidos y arquitectura enterprise', 'Sistemas distribuídos e arquitetura enterprise'],
  'Deep focus on microfrontends, asynchronous event streams, message bus orchestration and zero-downtime canary deployments.': ['Foco profundo en microfrontends, streams de eventos asincrónicos, orquestación de message buses y despliegues canary sin downtime.', 'Foco profundo em microfrontends, streams de eventos assíncronos, orquestração de message buses e deploys canary sem downtime.'],
  'Kafka / PubSub': ['Kafka / PubSub', 'Kafka / PubSub'],
  'Blue-Green / Canary': ['Blue-Green / Canary', 'Blue-Green / Canary'],
  'AI-Native Development & Agent Orchestration': ['Desarrollo nativo de IA y orquestación de agentes', 'Desenvolvimento nativo de IA e orquestração de agentes'],
  'Integration of MCP, autonomous goal-directed agents, deterministic tool calling and structured Specification-Driven Development lifecycles.': ['Integración de MCP, agentes autónomos orientados a objetivos, tool calling determinista y ciclos estructurados de desarrollo guiado por especificaciones.', 'Integração de MCP, agentes autônomos orientados a objetivos, tool calling determinístico e ciclos estruturados de desenvolvimento guiado por especificações.'],
  'RAG Ingestion': ['Ingesta RAG', 'Ingestão RAG'],
  'SDD Workflows': ['Workflows SDD', 'Workflows SDD'],
  'Advanced Modern Frontend & Mobile': ['Frontend moderno avanzado y mobile', 'Frontend moderno avançado e mobile'],
  'Production mastery of React, Next.js Server Components and React Native multi-tenant native bridging architectures.': ['Dominio de producción de React, Server Components de Next.js y arquitecturas de bridging nativo multi-tenant en React Native.', 'Domínio de produção de React, Server Components do Next.js e arquiteturas de bridging nativo multi-tenant em React Native.'],
  'Design Systems': ['Design systems', 'Design systems'],
  'Application Security & Zero-Trust Auth': ['Seguridad de aplicaciones y auth zero-trust', 'Segurança de aplicações e auth zero-trust'],
  'Enterprise identity pipelines: OAuth2 / OpenID Connect, RBAC validation, WebAuthn passkeys and encrypted data-at-rest policies.': ['Pipelines de identidad enterprise: OAuth2 / OpenID Connect, validación RBAC, passkeys WebAuthn y políticas de datos cifrados en reposo.', 'Pipelines de identidade enterprise: OAuth2 / OpenID Connect, validação RBAC, passkeys WebAuthn e políticas de dados criptografados em repouso.'],
  'OAuth 2.0 / OIDC': ['OAuth 2.0 / OIDC', 'OAuth 2.0 / OIDC'],
  'Passkeys / WebAuthn': ['Passkeys / WebAuthn', 'Passkeys / WebAuthn'],
  'Zero-Trust RBAC': ['RBAC zero-trust', 'RBAC zero-trust'],
  'PII Compliance': ['Compliance de PII', 'Compliance de PII'],
  'Communication & Languages': ['Comunicación e idiomas', 'Comunicação e idiomas'],
  'Cross-Functional Fluent': ['Fluidez cross-functional', 'Fluência cross-functional'],
  Spanish: ['Español', 'Espanhol'],
  English: ['Inglés', 'Inglês'],
  Native: ['Nativo', 'Nativo'],
  'Native mother-tongue proficiency for technical instruction, peer engineering review and executive client presentations.': ['Nativo con fluidez para instrucción técnica, revisión de ingeniería entre pares y presentaciones ejecutivas a clientes.', 'Nativo com fluência para instrução técnica, revisão de engenharia entre pares e apresentações executivas para clientes.'],
  'Professional Working': ['Nivel profesional', 'Nível profissional'],
  'Daily engagement in international engineering syncs, RFC drafting, technical standups and documentation governance.': ['Participación diaria en syncs internacionales de ingeniería, redacción de RFCs, standups técnicos y gobernanza de documentación.', 'Participação diária em syncs internacionais de engenharia, redação de RFCs, standups técnicos e governança de documentação.'],
  'Verified candidacy': ['Candidatura verificada', 'Candidatura verificada'],
  'Need verified credentials, transcripts, or peer references?': ['¿Necesitás credenciales, certificados o referencias verificadas?', 'Precisa de credenciais, históricos ou referências verificadas?'],
  'Official university enrollment records, academic transcripts and professional references are available upon request.': ['Registros de inscripción universitaria, certificados académicos y referencias profesionales disponibles a pedido.', 'Registros de matrícula universitária, históricos acadêmicos e referências profissionais disponíveis sob solicitação.'],
  'Download CV (PDF)': ['Descargar CV (PDF)', 'Baixar CV (PDF)'],
  'Contact Nicolás': ['Contactar a Nicolás', 'Contatar Nicolás'],

  // Contact view
  'Open Channel · Recruiter & Engineering Inquiries': ['Canal abierto · Consultas de recruiters e ingeniería', 'Canal aberto · Consultas de recrutadores e engenharia'],
  "Let's talk engineering.": ['Hablemos de ingeniería.', 'Vamos falar de engenharia.'],
  'Available for senior engineering roles, architectural reviews and AI-native delivery conversations. Direct channels below.': ['Disponible para roles senior de ingeniería, revisiones de arquitectura y conversaciones sobre entrega nativa de IA. Canales directos abajo.', 'Disponível para posições sênior de engenharia, revisões de arquitetura e conversas sobre entrega nativa de IA. Canais diretos abaixo.'],
  Email: ['Email', 'Email'],
  LinkedIn: ['LinkedIn', 'LinkedIn'],
  GitHub: ['GitHub', 'GitHub'],
  Résumé: ['CV', 'Currículo'],
  'Direct, async and preferred for detailed context.': ['Directo, asincrónico y preferido para contexto detallado.', 'Direto, assíncrono e preferido para contexto detalhado.'],
  'Best for recruiter outreach and quick introductions.': ['Ideal para contacto de recruiters e introducciones rápidas.', 'Ideal para contato de recrutadores e apresentações rápidas.'],
  'Code, experiments and open repositories.': ['Código, experimentos y repositorios abiertos.', 'Código, experimentos e repositórios abertos.'],
  'Full professional history, education and credentials.': ['Historial profesional completo, formación y credenciales.', 'Histórico profissional completo, formação e credenciais.'],
  'Write an Email': ['Escribir un email', 'Escrever um email'],
  'Open LinkedIn': ['Abrir LinkedIn', 'Abrir LinkedIn'],
  'Open GitHub': ['Abrir GitHub', 'Abrir GitHub'],
  'Based in Rosario, Argentina (UTC-3) · Open to remote and hybrid roles.': ['Radicado en Rosario, Argentina (UTC-3) · Abierto a roles remotos e híbridos.', 'Baseado em Rosario, Argentina (UTC-3) · Aberto a posições remotas e híbridas.'],

  // Modals
  'Deep Dive Specification': ['Especificación detallada', 'Especificação detalhada'],
  'This system decouples AI code generation from passive completions, introducing stateful agents with deterministic tools registered via the Model Context Protocol. Type-safe diffs are verified before file writes.': ['Este sistema desacopla la generación de código con IA de las completaciones pasivas, incorporando agentes con estado y herramientas deterministas registradas vía Model Context Protocol. Los diffs type-safe se verifican antes de escribir archivos.', 'Este sistema desacopla a geração de código com IA das completions passivas, introduzindo agentes com estado e ferramentas determinísticas registradas via Model Context Protocol. Os diffs type-safe são verificados antes de escrever arquivos.'],
  '3.2x faster': ['3.2x más rápido', '3.2x mais rápido'],
  'Delivery cycle after MCP and SDD adoption.': ['Ciclo de entrega tras adoptar MCP y SDD.', 'Ciclo de entrega após adotar MCP e SDD.'],
  'Type-safe production guardrails': ['Guardarraíles de producción type-safe', 'Guardrails de produção type-safe'],
  'High-Throughput Showcase': ['Showcase de alto rendimiento', 'Showcase de alta performance'],
  'A distributed authentication and biometric 2FA microfrontend embedded across business units without cross-origin iframe security penalties.': ['Un microfrontend distribuido de autenticación y 2FA biométrico embebido en múltiples unidades de negocio sin penalizaciones de seguridad por iframes cross-origin.', 'Um microfrontend distribuído de autenticação e 2FA biométrico embutido em várias unidades de negócio sem penalidades de segurança por iframes cross-origin.'],
  'Target handshake latency.': ['Latencia objetivo del handshake.', 'Latência alvo do handshake.'],
  'Specification-Driven Dev Pipeline': ['Pipeline de desarrollo guiado por especificaciones', 'Pipeline de desenvolvimento guiado por especificações'],
  'Multi-Agent Verification Architecture': ['Arquitectura de verificación multi-agente', 'Arquitetura de verificação multi-agente'],
  'Requirements documents become the single source of truth; generated code is transient and verified by specialist agent roles.': ['Los documentos de requisitos se vuelven la única fuente de verdad; el código generado es transitorio y verificado por roles de agentes especialistas.', 'Os documentos de requisitos se tornam a única fonte de verdade; o código gerado é transitório e verificado por papéis de agentes especialistas.'],
  'Pass rate across the verification loop.': ['Tasa de aprobación del loop de verificación.', 'Taxa de aprovação do loop de verificação.'],
  'Agri-Fintech Core': ['Núcleo agri-fintech', 'Núcleo agri-fintech'],
  'Qira Pagos Double-Entry Ledger': ['Ledger de doble entrada de Qira Pagos', 'Ledger de partidas dobradas do Qira Pagos'],
  'Real-time transactional flows support agricultural barter, invoice financing, multi-signature authorizations and automated reconciliation.': ['Flujos transaccionales en tiempo real soportan trueque agrícola, financiamiento de facturas, autorizaciones multifirma y conciliación automatizada.', 'Fluxos transacionais em tempo real suportam escambo agrícola, financiamento de faturas, autorizações multi-assinatura e conciliação automatizada.'],
  'Immutable ledger integrity.': ['Integridad inmutable del ledger.', 'Integridade imutável do ledger.'],
  'React Native Multi-Tenant': ['React Native multi-tenant', 'React Native multi-tenant'],
  'White-Label Utility Mobile Architecture': ['Arquitectura mobile white-label para utilities', 'Arquitetura mobile white-label para utilities'],
  'A unified codebase powers customized utility and IoT applications through build-time configuration, runtime theme tokens and feature flags.': ['Una codebase unificada impulsa aplicaciones de utilities e IoT a medida mediante configuración en build-time, tokens de tema en runtime y feature flags.', 'Uma codebase unificada alimenta aplicações de utilities e IoT personalizadas via configuração em build-time, tokens de tema em runtime e feature flags.'],
  'Client builds from one architecture.': ['Builds de clientes desde una sola arquitectura.', 'Builds de clientes a partir de uma única arquitetura.'],
};

function t(key) {
  const entry = dictionary[key];
  if (!entry) return key;
  return currentLanguage === 'es' ? entry[0] : currentLanguage === 'pt' ? entry[1] : key;
}

function th(key) {
  const entry = htmlDictionary[key];
  if (!entry) return key;
  return entry[currentLanguage] || entry.en;
}

const data = {
  featured: [
    {
      label: 'Mercado Libre',
      period: '2023 — Present',
      tone: 'cyan',
      title: 'Mission-Critical Auth & Microfrontends',
      body: "Overhauled Latin America's highest-volume fintech and e-commerce authentication ecosystem. Rolled out Google One Tap, biometric WebAuthn and decoupled microfrontend modules serving 50M+ active users.",
      tags: ['TypeScript', 'Microfrontends', 'OAuth 2.0', 'Module Federation'],
    },
    {
      label: 'AI Lab & Architecture',
      period: '2023 — Present',
      tone: 'green',
      title: 'AI-Native Engineering & MCP Workflows',
      body: 'Pioneered Specification-Driven Development and custom Model Context Protocol servers. Agent-assisted workflows with Claude Code and Codex condensed discovery and implementation cycles by 3.2x.',
      tags: ['Claude Code', 'MCP Tools', 'Prompt Pipelines', 'Agent Orchestration'],
    },
    {
      label: 'Qira Fintech & Mobile',
      period: 'Enterprise Systems',
      tone: 'indigo',
      title: 'Scalable Fintech Wallets & Core Systems',
      body: 'Built end-to-end payment platforms, virtual card onboarding and real-time ledger sync across web and mobile with strict type-safe schemas and multi-country compliance workflows.',
      tags: ['React Native', 'Next.js', 'Node.js', 'Fintech Security'],
    },
  ],
  projects: [
    { id: 'mcp', category: 'ai', label: 'AI-Native · MCP Protocol · Automation', impact: '3.2x faster delivery', title: 'Agentic Dev Framework & MCP Suite', body: 'Custom Model Context Protocol toolchain orchestrating Claude Code and Codex for AST refactoring, spec-based code generation and automated verification loops.', tags: ['TypeScript', 'MCP Protocol', 'Claude Code', 'Node.js', 'AST Parsers'], action: 'View Architecture Breakdown', link: 'GitHub / Docs', featured: true },
    { id: 'auth', category: 'enterprise', label: 'Enterprise Scale · Zero-Downtime', impact: '99.99% Uptime', title: 'Microfrontend Auth Engine', body: 'Decoupled authentication architecture handling OAuth 2.0, WebAuthn biometric login and multi-tenant session handoffs across millions of concurrent users.', tags: ['React', 'Webpack 5 MF', 'TypeScript', 'OAuth 2.0 / OIDC'], action: 'Explore Architecture', link: 'GitHub', visual: 'auth' },
    { id: 'sdd', category: 'ai', label: 'Compiler & Agent Pipeline', impact: '3-Agent Linting', title: 'SDD Compiler Engine', body: 'Deterministic workflow compiler turning structured Markdown specifications into verified TypeScript codebases with adversarial linting and invariant testing.', tags: ['TypeScript', 'Next.js', 'Zod Schemas', 'Vitest'], action: 'Explore Specification', link: 'GitHub', visual: 'workflow' },
    { id: 'qira', category: 'fintech', label: 'Fintech & Ledger', impact: 'ACID Guaranteed', title: 'Qira Pagos — Core Wallet', body: 'End-to-end digital wallet with virtual card onboarding, immutable double-entry ledgers, banking integrations and multi-currency exchange pipelines.', tags: ['React Native', 'Node.js', 'PostgreSQL', 'Redis'], action: 'System Topology', link: 'GitHub', visual: 'ledger' },
    { id: 'mobile', category: 'fintech', label: 'Mobile Architecture', impact: '42+ Distributed Tenants', title: 'White-Label Smart Metering', body: 'Scalable React Native architecture for utility smart-metering companies across Latin America with compile-time branding tokens and dynamic IoT feeds.', tags: ['React Native', 'Redux Toolkit', 'Fastlane CI', 'WatermelonDB'], action: 'View Case Study', link: 'GitHub', visual: 'mobile' },
  ],
  skills: [
    { index: '01 // AI-NATIVE', title: 'AI-Native & Agentic Systems', body: 'Model orchestration, agent tool use, context boundary control and prompt-driven verification workflows.', tags: 'ai claude code codex mcp model context protocol sdd agentic', chips: ['MCP Protocol', 'Claude Code', 'OpenAI Codex', 'Spec-Driven Dev', 'Agent Scaffolding'], tone: 'cyan', context: 'Built custom MCP servers for code refactoring and automated verification; reduced manual development cycles by 3x.' },
    { index: '02 // RUNTIMES', title: 'Languages & Core Runtimes', body: 'Type-safe runtime architecture, high-concurrency event loops, asynchronous backends and deterministic computation.', tags: 'typescript javascript node python go sql runtimes', chips: ['TypeScript 5.x', 'JavaScript ESNext', 'Node.js', 'Python', 'Go', 'SQL / PostgreSQL'], context: '100% strict TypeScript typing enforced across monorepos and backend boundaries.' },
    { index: '03 // CLIENT CORE', title: 'Frontend & Mobile Systems', body: 'Component graph composition, atomic state stores, cross-platform mobile architecture and modern rendering patterns.', tags: 'react nextjs react native redux toolkit frontend mobile', chips: ['React 18 / 19', 'Next.js App Router', 'React Native', 'Tailwind CSS', 'Redux Toolkit'], context: 'Engineered accessible, high-performance UI systems and multi-tenant cross-platform deployments.' },
    { index: '04 // DISTRIBUTED', title: 'Distributed Systems & MFEs', body: 'Decoupled domain architectures, independent runtime module delivery, API gatekeeping and migration orchestration.', tags: 'microfrontends module federation turborepo system design architecture distributed', chips: ['Module Federation', 'Turborepo', 'Strangler Pattern', 'GraphQL / REST', 'Canary Deployments'], context: 'Architected zero-dependency microfrontend modules serving 50M+ MAU and enabling autonomous squad releases.' },
    { index: '05 // SECURITY', title: 'Security, Auth & Persistence', body: 'Biometrics, cryptographic token exchange, distributed session caching and strict data layer modeling.', tags: 'security auth oauth oidc webauthn jwt postgresql prisma redis databases', chips: ['OAuth 2.0 / OIDC', 'WebAuthn / Passkeys', 'JWT / JWKS', 'PostgreSQL', 'Redis', 'Zod'], context: 'Designed high-throughput identity recovery conduits with deterministic schema guardrails.' },
    { index: '06 // RELIABILITY', title: 'Testing, CI/CD & Observability', body: 'Continuous integration pipelines, automated visual regression gates and real-time distributed tracing.', tags: 'testing jest vitest cypress playwright chromatic github actions datadog sentry opentelemetry', chips: ['Jest / Vitest', 'Cypress / Playwright', 'Chromatic', 'GitHub Actions', 'Datadog APM'], context: 'Automated quality enforcement stops breaking visual and logic regressions before merge.' },
  ],
};

const icon = (value, tone = '') => `<span class="icon-box ${tone}" aria-hidden="true">${value}</span>`;
const tags = (items) => items.map((item) => `<span class="tag">${item}</span>`).join('');
const translatedTags = (items) => tags(items.map(t));
const stackTags = (items) => `<div class="stack-tags">${translatedTags(items)}</div>`;
const layout = (view, content) => `<div class="view view-${view}">${content}</div>`;

function overview() {
  const featured = data.featured.map((item) => `<article class="record-card card-lift reveal"><div class="record-meta"><span class="record-label ${item.tone}">${t(item.label)}</span><span class="mono-label">${t(item.period)}</span></div><h3>${t(item.title)}</h3><p>${t(item.body)}</p><div class="card-tags">${translatedTags(item.tags)}</div></article>`).join('');
  const stack = [
    ['⌘', 'Languages & Core Tech', 'Deep expertise in modern JavaScript and TypeScript runtimes with high-performance backend tools.', ['TypeScript 5.x', 'Next.js / React', 'Node.js', 'Go (Golang)', 'GraphQL & REST'], 'cyan'],
    ['⌘', 'Architecture & Scale', 'Resilient distributed frontends and authentication security models designed for autonomous teams.', ['Microfrontends', 'Module Federation', 'OAuth2 & WebAuthn', 'Turborepo', 'CI/CD Canary'], 'indigo'],
    ['✦', 'AI-Native & Agentic', 'Agentic workflows that elevate software engineering throughput, precision and verifiability.', ['Claude Code', 'Model Context Protocol', 'Spec-Driven Dev', 'Codex & Cursor', 'Autonomous Scaffolding'], 'green'],
  ].map(([symbol, title, body, chips, tone]) => `<article class="card card-lift reveal">${icon(symbol, tone)}<h3>${t(title)}</h3><p>${t(body)}</p><div class="card-tags">${translatedTags(chips)}</div></article>`).join('');
  return layout('overview', `
    <section class="shell overview-hero">
      <div class="availability"><span class="status-dot pulse"></span> ${t('Open to Staff IC & AI Architect Roles · Remote / Hybrid')}</div>
      <h1>${t('Senior Software Engineer &')} <span class="gradient-text">${t('AI Architect')}</span></h1>
      <p class="lead">${th('overview.lead')}</p>
      <div class="hero-actions"><a class="button button-light" href="assets/nicolas-costanza.pdf" download><span>↓</span> ${t('Download Resume')}</a><a class="button button-outline" href="#contact">✉ ${t('Get in Touch')}</a><a class="button button-ghost" href="#experience">${t('View Full Experience')} <span>→</span></a><button class="button button-ghost" type="button" data-copy-email>⧉ ${t('Copy Email')}</button></div>
      <div class="hero-stats"><div><strong>7+ Yrs</strong><span>${t('Engineering Experience')}</span></div><div><strong class="cyan">50M+</strong><span>${t('Users in Production')}</span></div><div><strong>Mercado Libre</strong><span>${t('Auth & Core Frontend')}</span></div><div><strong class="green">AI-Native</strong><span>${t('MCP & Agentic SDD')}</span></div></div>
    </section>
    <section class="shell section section-rule">
      <div class="section-heading"><div><div class="eyebrow">${t('Track Record & Impact')}</div><h2>${t('Featured Engineering Leadership')}</h2></div><a class="text-link" href="#experience">${t('Explore experience details')} →</a></div>
      <div class="card-grid three-col">${featured}</div>
    </section>
    <section class="shell section section-rule">
      <div class="section-heading"><div><div class="eyebrow quiet">${t('ATS & Technical Competencies')}</div><h2>${t('Technical Stack & Specialization')}</h2></div></div>
      <div class="card-grid three-col">${stack}</div>
    </section>
    <section class="shell section"><div class="cta"><div><div class="eyebrow">${t('Recruiter & architectural inquiries')}</div><h3>${t('Hiring for a Senior IC or AI Architect role?')}</h3><p>${t('Open to leadership conversations, staff engineering challenges and building next-generation web and AI systems.')}</p></div><div class="cta-actions"><a class="button button-light" href="assets/nicolas-costanza.pdf" download>↓ ${t('Download CV')}</a><a class="button button-outline" href="#contact">◷ ${t('Schedule Interview')}</a></div></div></section>
  `);
}

function pageHeader(eyebrow, title, description, meta = '') {
  return `<section class="shell page-header"><div><div class="eyebrow"><span class="status-dot pulse"></span> ${eyebrow}</div><h1>${title}</h1><p>${description}</p></div>${meta}</section>`;
}

function metricGrid(items) {
  return `<div class="metric-grid">${items.map(([label, value, note, tone = '']) => `<div class="metric-card"><span class="mono-label">${t(label)}</span><strong class="${tone}">${value}</strong><span>${t(note)}</span></div>`).join('')}</div>`;
}

const experiences = [
  { id: 'role-meli', company: 'Mercado Libre', role: 'Senior Software Engineer', period: 'Aug 2023 – Present', domain: 'https://www.mercadolibre.com/jms/mla/lgz/login', current: true, summaryKey: 'experience.meli.summary', impacts: [['↗', 'Auth Ecosystem & Microfrontends', 'Architected decoupled login and account recovery micro-apps via Module Federation, reducing deployment blast radius across distributed squads.'], ['⌁', 'Google Sign-In & Canary Rollouts', 'Engineered OAuth2 Google Identity federation with graduated canary deployments and Datadog monitors that halt delivery on latency anomalies.'], ['✓', 'TypeScript Migration (-42% Runtime Exceptions)', 'Standardized strict end-to-end schemas across legacy JavaScript repositories, decreasing production runtime crashes and auth payload regressions.'], ['✦', 'AI-Native Engineering (3x Delivery Acceleration)', 'Pioneered Specification-Driven Development backed by internal MCP servers with Claude Code to streamline generation, fixtures and architecture RFCs.']], technologies: ['TypeScript', 'Next.js', 'Microfrontends', 'Module Federation', 'OAuth2 / OIDC', 'Jest', 'Datadog', 'Claude MCP'] },
  { id: 'role-widergy', company: 'Widergy', role: 'Frontend Mobile Engineer', period: 'Mar 2023 – Aug 2023', domain: 'Smart Energy & Utilities', summary: 'Spearheaded modular white-label mobile applications for utility and smart metering providers across Latin America, focusing on multi-client deployment and real-time consumption telemetry.', impacts: [['▧', 'High-Reusability White-Label React Native Architecture', 'Constructed a multi-tenant client foundation for dynamic branding swaps, configurable payment gateways and tenant-specific billing modules.'], ['↻', 'Offline-First Synchronization Engine', 'Implemented optimistic state caching with Redux Toolkit and SQLite persistence for responsive meter readings under intermittent network conditions.']], technologies: ['React Native', 'TypeScript', 'Redux Toolkit', 'Fastlane', 'Native Modules', 'REST APIs'] },
  { id: 'role-radium', company: 'Radium Rocket', role: 'Full Stack Software Engineer', period: 'Sep 2019 – Mar 2023', domain: 'Fintech & Enterprise', summary: 'Engineered high-volume enterprise products end-to-end as core developer for Qira Global, an agri-commerce platform, and Qira Pagos, a fintech digital wallet.', impacts: [['▣', 'Fintech Digital Wallet (Qira Pagos)', 'Built real-time transaction processing, CVU payment gateways and banking webhook ingress with strict idempotency keys and zero ledger reconciliation discrepancies.'], ['▦', 'Scalable B2B Backoffice & Document Pipeline', 'Developed RBAC backoffices, multi-currency catalog filtering and pre-signed S3 streaming for legal agricultural grain contracts.'], ['⌁', 'Performance, Observability & JWT Security', 'Decreased MTTD by 60% with automated Sentry releases and source maps while deploying cryptographic JWT refresh rotation across Node microservices.']], technologies: ['React', 'React Native', 'Node.js', 'Express', 'MongoDB', 'AWS S3', 'Fintech Security'] },
];

function experienceCard(item) {
  const summary = item.summaryKey ? th(item.summaryKey) : t(item.summary);
  const isUrl = item.domain.startsWith('http');
  return `<article class="experience-card reveal" id="${item.id}" data-company="${item.company === 'Mercado Libre' ? 'meli' : item.company === 'Widergy' ? 'widergy' : 'radium'}"><div class="experience-top"><div><div class="experience-title"><h2>${item.company}</h2><span>/</span><strong>${item.role}</strong>${item.current ? `<span class="current">● ${t('Current Role')}</span>` : ''}</div><div class="entry-meta">◷ ${t(item.period)} · ${t('Rosario / Buenos Aires · Full-time / Remote')}</div></div>${isUrl ? `<a class="domain-badge domain-link" href="${item.domain}" target="_blank" rel="noreferrer">${item.domain}</a>` : `<span class="domain-badge">${t(item.domain)}</span>`}</div><div class="experience-summary">${summary}</div><div class="impact-heading">${t('Key Impact & Technical Execution')}</div><div class="impact-list">${item.impacts.map(([symbol, title, body]) => `<div class="impact-row"><span>${symbol}</span><div><strong>${t(title)}</strong><p>${t(body)}</p></div></div>`).join('')}</div><div class="technology-row"><span class="mono-label">${t('Technologies:')}</span>${translatedTags(item.technologies)}</div></article>`;
}

function experience() {
  return layout('experience', `${pageHeader(t('Career Timeline & Track Record'), t('Engineering Experience'), t('7+ years architecting scalable web ecosystems, mission-critical authentication at Mercado Libre and AI-native delivery workflows across Latin America and global markets.'))}
    <section class="shell">${metricGrid([['Experience', '7+', 'Years · Full-stack & systems'], ['Scale', '50M+', 'MAU · Users served at MELI', 'cyan'], ['Domain', 'Tier-1', 'Auth · Zero-trust ecosystem'], ['Mobility', 'Remote', 'US/EU overlap & hybrid']])}<div class="experience-toolbar"><div class="filter-list"><button class="filter-button active" data-experience-filter="all">${t('All Experiences')}</button><button class="filter-button" data-experience-filter="meli">Mercado Libre</button><button class="filter-button" data-experience-filter="widergy">Widergy</button><button class="filter-button" data-experience-filter="radium">Radium Rocket</button></div><a class="button button-ghost button-small" href="assets/nicolas-costanza.pdf" download>↓ ${t('Download PDF CV')}</a></div></section>
    <section class="shell experience-list">${experiences.map(experienceCard).join('')}</section>
    <section class="shell section"><div class="cta"><div><div class="eyebrow">${t('Immediate impact opportunity')}</div><h3>${t('Looking for a Senior IC or Tech Lead?')}</h3><p>${t('Available for senior engineering, staff frontend and AI architecture roles in distributed international teams.')}</p></div><div class="cta-actions"><a class="button button-light" href="assets/nicolas-costanza.pdf" download>↓ ${t('Download Full CV (PDF)')}</a><a class="button button-outline" href="#contact">◷ ${t('Schedule Intro Call')}</a></div></div></section>`);
}

function projectVisual(project) {
  if (project.featured) return `<div class="project-bento"><div><span class="mono-label">${t('The Engineering Bottleneck')}</span><p>${t('Teams lose high-context capacity on repetitive scaffolding, manual review cycles and syntax alignment across multi-repo dependencies.')}</p></div><div><span class="mono-label cyan">${t('The Deterministic Engine')}</span><p>${t('Dual-tier protocol converts technical design schemas into AST nodes with sandboxed test runners and verifiable output.')}</p></div></div>`;
  if (project.visual === 'workflow') return `<div class="project-visual"><span>${t('PIPELINE VERIFICATION STAGES')}</span><div class="workflow"><b>● ${t('Spec Parser')}</b><i>→</i><b>● ${t('Agent Synthesizer')}</b><i>→</i><b class="green">● ${t('CI Sandbox')}</b></div></div>`;
  const visual = { auth: ['FEDERATION: MODULE FEDERATION 2.0', '< 18ms Handshake', 'OIDC + PKCE + WebAuthn FIDO2'], ledger: ['TX INTEGRITY: ACID COMPLIANT', 'ZERO RECON DELAY', 'Sub-second settlement & webhook routing'], mobile: ['DEPLOYMENT: FASTLANE MATRIX', '42+ Client Builds', 'WatermelonDB Offline-First Architecture'] }[project.visual];
  return visual ? `<div class="project-visual"><div><span>${visual[0]}</span><strong>${visual[1]}</strong></div><p>▣ &nbsp; ${visual[2]}</p></div>` : '';
}

function projectCard(project) {
  return `<article class="project-card ${project.featured ? 'featured' : ''} reveal" data-category="${project.category}" data-project="${project.id}"><div class="project-top"><span class="project-badge ${project.category === 'ai' ? 'cyan' : project.category === 'fintech' ? 'green' : ''}"><span class="status-dot"></span>${t(project.label)}</span><span class="project-impact">${t(project.impact)}</span></div><h2>${t(project.title)}</h2><p class="project-description">${t(project.body)}</p>${projectVisual(project)}<div class="card-tags">${translatedTags(project.tags)}</div><div class="project-footer"><button class="button ${project.featured ? 'button-light' : 'button-outline'} button-small" type="button" data-open-modal="${project.id}">${t(project.action)} →</button><a class="text-link" href="https://github.com/nicolascostanza" target="_blank" rel="noreferrer">${project.link} ↗</a></div></article>`;
}

function aiLab() {
  return layout('ai', `${pageHeader(`${t('Portfolio & System Builds')} / NICOLAS_COSTANZA_AI_LAB_V4.2`, t('Featured Projects & AI Lab'), t('Curated selection of production-grade architectures, autonomous agent workflows and mission-critical applications engineered for deterministic resilience.'), `<div class="telemetry-panel"><div><strong>99.994%</strong><span>${t('Runtime Uptime')}</span></div><div><strong>14 Active</strong><span>${t('Production Specs')}</span></div><div><strong>L6 / Principal AI-SE</strong><span>${t('Engine Profile')}</span></div></div>`)}
    <section class="shell"><div class="filters"><div class="filter-list"><button class="filter-button active" data-filter="all">${t('All Projects')} (${data.projects.length})</button><button class="filter-button" data-filter="ai">${t('AI-Native & MCP')}</button><button class="filter-button" data-filter="enterprise">${t('Enterprise Microfrontends')}</button><button class="filter-button" data-filter="fintech">${t('Fintech & Mobile')}</button></div><span class="query-status">◉ QUERY_ACTIVE: ALL_SYSTEMS_OPERATIONAL</span></div><div class="project-grid" id="project-grid">${data.projects.map(projectCard).join('')}</div>
      <div class="verification-panel"><div class="panel-heading"><div><h3>${t('System Verification & Engineering Standards')}</h3><p>${t('Strict quality assurance benchmarks applied across production systems and autonomous AI pipelines.')}</p></div><span class="mono-label green">COMPLIANCE: L6 PROTOCOL</span></div><div class="verification-grid"><div><span>${t('TYPE SAFETY')}</span><strong>${t('100% Strict')}</strong><p>${t('Zero unsafe escapes in production codebases.')}</p></div><div><span>${t('E2E DETERMINISM')}</span><strong class="cyan">${t('<0.01% Drift')}</strong><p>${t('Autonomous regression tests on each AST emit.')}</p></div><div><span>${t('SECURITY AUDIT')}</span><strong>OWASP Top 10</strong><p>${t('Automated SAST and secret scanning on CI push.')}</p></div><div><span>${t('LATENCY P99')}</span><strong class="green">&lt;45ms</strong><p>${t('Federated edge distribution nodes.')}</p></div></div></div>
      ${sandboxMarkup()}
      <div class="cta"><div><div class="eyebrow">${t('Recruiter & architectural inquiries')}</div><h3>${t('Want to review architectural designs or code samples?')}</h3><p>${t('Available for senior architectural consultations, lead staff engineer discussions and autonomous AI system design reviews.')}</p></div><div class="cta-actions"><a class="button button-light" href="#contact">✉ ${t('Get in Touch')}</a><a class="button button-outline" href="assets/nicolas-costanza.pdf" download>↓ ${t('Download Resume')}</a></div></div>
    </section>`);
}

function sandboxMarkup() {
  return `<div class="sandbox"><div class="sandbox-header"><div><div class="sandbox-title"><span class="status-dot"></span> ${t('AI Interactive Sandbox Terminal')}</div><p>${t("Live simulation of Nicolás's MCP agent executing task-spec parsing and validation loops.")}</p></div><div class="sandbox-controls"><button class="button button-cyan button-small" id="run-agent" type="button">▶ ${t('Execute Agent Loop')}</button><button class="button button-outline button-small" id="clear-agent" type="button">${t('Clear')}</button></div></div><div class="sandbox-grid"><div class="directive"><span class="mono-label cyan">${t('// Target SDD Spec')}</span><p>${t('Construct an idempotent payment middleware with Redis TTL lock and Prometheus telemetry export.')}</p><div class="directive-meta">MCP Server: <b>Claude Code Runtime</b><br>${t('Guardrail')}: <b>${t('Human approval before write')}</b></div></div><div class="sandbox-terminal"><div class="sandbox-terminal-head"><strong>agent://verification-loop</strong><span id="terminal-status">READY</span></div><div class="terminal-output" id="terminal-output"><div>${t('> Ready for instructions. Click "Execute Agent Loop" above.')}</div></div><div class="sandbox-footer"><span>model: claude-code</span><span>transport: stdio</span></div></div></div></div>`;
}

function skillCard(skill) {
  return `<article class="skill-card reveal" data-tags="${skill.tags}"><div class="skill-head"><div>${icon('⌘', skill.tone || '')}<span class="skill-index">${skill.index}</span></div><span class="skill-status">${t('VERIFIED')}</span></div><h3>${t(skill.title)}</h3><p>${t(skill.body)}</p><span class="skill-label">${t('Key Technologies')}</span><div class="skill-chips">${translatedTags(skill.chips)}</div><div class="production-context"><span class="mono-label ${skill.tone || ''}">${t('↗ Production Context')}</span><p>${t(skill.context)}</p></div></article>`;
}

function stack() {
  return layout('stack', `${pageHeader(`${t('Technical Capabilities & Proficiency')} // v2025.2 Spec Sheet`, t('Technical Stack & Architecture'), t('A transparent breakdown of competencies, engineering standards and production-proven technologies built for enterprise reliability and AI-native velocity.'), `<div class="view-toggle"><button class="active" type="button" data-view="matrix">▦ ${t('Skill Matrix')}</button><button type="button" data-view="blueprints">⌁ ${t('Architectures')}</button></div>`)}
    <section class="shell"><div class="quick-badges"><span>✓ <b>${t('7+ Years')}</b> ${t('Production Experience')}</span><span>▣ <b>TypeScript &amp; React</b> ${t('Full-Lifecycle Expert')}</span><span>◈ <b>50M+ MAU</b> ${t('Enterprise Systems')}</span><span>✦ <b>AI-Native</b> ${t('MCP & SDD')}</span></div><div class="skills-head"><div><div class="eyebrow">${t('Unified Competence Map')}</div><h2>${t('Production-tested domains')}</h2><p>${t('Search across runtime, architecture, AI and reliability capabilities.')}</p></div><input class="search-input" id="skill-search" type="search" placeholder="${t('Search skills')}" aria-label="${t('Search skills')}"></div><div class="skills-grid" id="skills-grid">${data.skills.map(skillCard).join('')}</div>
      <div class="standards-panel"><div><div class="eyebrow">${t('Production Standards')}</div><h3>${t('Operational Benchmarks')}</h3></div><span class="mono-label">${t('Metrics validated under heavy multi-region traffic loads')}</span><div class="summary-stats"><div><span>${t('TYPE STRICTNESS')}</span><strong>100%</strong><small>${t('Zero unsafe assertions')}</small></div><div><span>${t('MAX USER SCALE')}</span><strong>50M+</strong><small>${t('MAU sustained reliability')}</small></div><div><span>${t('DEV CYCLE REDUCTION')}</span><strong class="cyan">3.2x</strong><small>${t('Via custom MCP & SDD tooling')}</small></div><div><span>${t('DEPLOYMENT CADENCE')}</span><strong>Daily</strong><small>${t('Zero-downtime canary waves')}</small></div></div></div>
      <div class="principles"><div class="eyebrow">${t('Design Ideology')}</div><h2>${t('Architecture Guiding Principles')}</h2><p class="body-copy">${t('Three strict doctrines applied whenever architecting platforms, scaling engineering groups or leading technical redesigns.')}</p><div class="principles-grid"><article class="principle">${icon('01', 'cyan')}<h3>${t('Specification-Driven Development')}</h3><p>${t('Strict schemas, API contracts and invariant models precede syntax so agents and engineers generate coherent, self-validating modules.')}</p><span>${t('Strict runtime typing with Zod + TypeScript')}</span></article><article class="principle">${icon('02')}<h3>${t('Autonomous Domain Boundaries')}</h3><p>${t('Systems are compartmentalized into distinct, decoupled domains. Squads deploy independently without blocking global dependencies.')}</p><span>${t('Module federation with hermetic dependencies')}</span></article><article class="principle">${icon('03', 'green')}<h3>${t('Progressive Decoupling & Risk Mitigation')}</h3><p>${t('Legacy code is replaced safely behind feature flags with automated canary evaluations and fast rollback triggers.')}</p><span>${t('Canary analysis with telemetry health-checks')}</span></article></div></div>
      <div class="blueprint"><div class="blueprint-header"><span>● architecture-verify.config.ts</span><span class="green">● Ready</span></div><pre><span class="quiet">${t('// Nicolás Costanza — High-Assurance Architectural Guardrails')}</span>
<span class="syntax">export const</span> <span class="value">SystemStandard</span> = {
  aiOrchestration: {
    specVerification: <span class="value">"model-context-protocol"</span>,
    latencyBudgetMs: <span class="value">450</span>,
    autonomousToolExecution: <span class="syntax">true</span>,
    humanInTheLoopEscalation: <span class="syntax">true</span>,
  },
  distributedFrontend: { federationIsolation: <span class="value">"zero-leakage-runtime"</span> },
  securityPosture: { identityProtocol: [<span class="value">"OAuth2"</span>, <span class="value">"WebAuthn"</span>] }
} <span class="syntax">as const</span>;</pre></div>
      <div class="cta"><div><div class="eyebrow">${t('Open to senior engineering & AI architect leadership roles')}</div><h3>${t('Ready to scale your technical infrastructure?')}</h3><p>${t('Available for remote Staff / Principal Frontend, systems architecture and AI-native engineering advisory.')}</p></div><div class="cta-actions"><a class="button button-light" href="#contact">✉ ${t('Initiate Technical Interview')}</a><a class="button button-outline" href="assets/nicolas-costanza.pdf" download>↓ ${t('Download Detailed Resume')}</a></div></div>
    </section>`);
}

function education() {
  const degrees = [
    { icon: '⌘', date: '2017 – Present', title: 'Industrial Engineering', subtitle: 'Ingeniería Industrial', focus: 'Core Engineering Disciplines', chips: ['Systems Thinking', 'Stochastic Analysis', 'Operations Optimization', 'Statistical Quality Control', 'Project Governance'], insight: 'Brings foundational systems-engineering methodology, operational process optimization and quantitative models into distributed software architectures.' },
    { icon: '✦', date: '2022 – Present', title: 'Technician in Artificial Intelligence', subtitle: 'Técnico Universitario en Inteligencia Artificial', focus: 'Applied AI Coursework', chips: ['Neural Architectures', 'Supervised / Unsupervised ML', 'Vector Spaces & RAG', 'Mathematical Computing', 'Agent Orchestration'], insight: 'Provides formal rigour in mathematical AI foundations, bridging LLM prompting and autonomous agents with mission-critical web application codebases.' },
  ];
  const degreeCards = degrees.map((degree) => `<article class="degree-card card-lift reveal"><div class="degree-top">${icon(degree.icon, 'cyan')}<div><span class="date-badge">${degree.date}</span><p>Rosario, Santa Fe, AR</p></div></div><span class="institution">Universidad Nacional de Rosario</span><h3>${t(degree.title)}</h3><em>${degree.subtitle}</em><span class="skill-label">${t(degree.focus)}</span><div class="skill-chips">${translatedTags(degree.chips)}</div><div class="insight"><span class="mono-label cyan">${t('◉ Recruiter Engineering Insight')}</span><p>${t(degree.insight)}</p></div></article>`).join('');
  const learning = [
    ['SYS // ARCH', 'Distributed Systems & Enterprise Architecture', 'Deep focus on microfrontends, asynchronous event streams, message bus orchestration and zero-downtime canary deployments.', ['Event-Driven', 'Kafka / PubSub', 'Microfrontends', 'Blue-Green / Canary']],
    ['AI // AGENTIC', 'AI-Native Development & Agent Orchestration', 'Integration of MCP, autonomous goal-directed agents, deterministic tool calling and structured Specification-Driven Development lifecycles.', ['MCP Protocol', 'Autonomous Agents', 'RAG Ingestion', 'SDD Workflows']],
    ['FRONTEND // CROSS-PLATFORM', 'Advanced Modern Frontend & Mobile', 'Production mastery of React, Next.js Server Components and React Native multi-tenant native bridging architectures.', ['React 19', 'Next.js RSC', 'React Native', 'Design Systems']],
    ['SEC // INFRA', 'Application Security & Zero-Trust Auth', 'Enterprise identity pipelines: OAuth2 / OpenID Connect, RBAC validation, WebAuthn passkeys and encrypted data-at-rest policies.', ['OAuth 2.0 / OIDC', 'Passkeys / WebAuthn', 'Zero-Trust RBAC', 'PII Compliance']],
  ].map(([label, title, body, chips]) => `<article class="learning-card reveal"><span class="mono-label cyan">${label}</span>${icon('⌁')}<h3>${t(title)}</h3><p>${t(body)}</p><div class="card-tags">${translatedTags(chips)}</div></article>`).join('');
  return layout('education', `${pageHeader(`${t('Academic Background & Continuous Learning')} / REF: EDU-2025-NC`, t('Education & Credentials'), t('Formal engineering foundations, specialized AI university curriculum and enterprise-grade distributed systems mastery.'), `<div class="header-chips"><span>▣ UNR Rosario</span><span>✦ ${t('AI Specialization')}</span><span>⌁ ${t('Systems Rigor')}</span></div>`)}
    <section class="shell education-section"><div class="section-heading"><div><span class="section-number">01 //</span><h2>${t('Formal Higher Education')}</h2></div><span class="mono-label">Universidad Nacional de Rosario (UNR)</span></div><div class="degree-grid">${degreeCards}</div></section>
    <section class="shell education-ribbon"><div>${icon('⌘', 'cyan')}<div><strong>${t('Dual-Discipline Advantage')}</strong><span>${t('Industrial Engineering optimization paired with academic Machine Learning engineering')}</span></div></div><div><strong class="cyan">${t('8+ Years')}</strong><span>${t('Academic Tenure')}</span></div><div><strong>100% Remote-Ready</strong><span>${t('Global Teams')}</span></div></section>
    <section class="shell education-section"><div class="section-heading"><div><span class="section-number">02 //</span><h2>${t('Continuous Learning & Architectural Focus')}</h2></div><span class="mono-label">${t('Production Hardened')}</span></div><div class="learning-grid">${learning}</div></section>
    <section class="shell education-section"><div class="section-heading"><div><span class="section-number">03 //</span><h2>${t('Communication & Languages')}</h2></div><span class="mono-label">${t('Cross-Functional Fluent')}</span></div><div class="language-grid"><article><div>${icon('ES', 'cyan')}</div><div><div class="language-title"><h3>${t('Spanish')}</h3><span>${t('Native')}</span></div><p>${t('Native mother-tongue proficiency for technical instruction, peer engineering review and executive client presentations.')}</p></div></article><article><div>${icon('EN', 'cyan')}</div><div><div class="language-title"><h3>${t('English')}</h3><span>${t('Professional Working')}</span></div><p>${t('Daily engagement in international engineering syncs, RFC drafting, technical standups and documentation governance.')}</p></div></article></div></section>
    <section class="shell section"><div class="cta"><div><div class="eyebrow">${t('Verified candidacy')}</div><h3>${t('Need verified credentials, transcripts, or peer references?')}</h3><p>${t('Official university enrollment records, academic transcripts and professional references are available upon request.')}</p></div><div class="cta-actions"><a class="button button-light" href="assets/nicolas-costanza.pdf" download>▣ ${t('Download CV (PDF)')}</a><a class="button button-outline" href="#contact">➤ ${t('Contact Nicolás')}</a></div></div></section>`);
}

function contact() {
  const channels = [
    { icon: '✉', tone: 'cyan', title: 'Email', body: 'Direct, async and preferred for detailed context.', action: 'Write an Email', href: `mailto:${email}` },
    { icon: 'in', tone: '', title: 'LinkedIn', body: 'Best for recruiter outreach and quick introductions.', action: 'Open LinkedIn', href: 'https://www.linkedin.com/in/nicolascostanza/', external: true },
    { icon: '⌘', tone: '', title: 'GitHub', body: 'Code, experiments and open repositories.', action: 'Open GitHub', href: 'https://github.com/nicolascostanza', external: true },
    { icon: '↓', tone: 'green', title: 'Résumé', body: 'Full professional history, education and credentials.', action: 'Download CV (PDF)', href: 'assets/nicolas-costanza.pdf', download: true },
  ];
  const cards = channels.map((channel) => `<a class="contact-card card-lift reveal" href="${channel.href}"${channel.external ? ' target="_blank" rel="noreferrer"' : ''}${channel.download ? ' download' : ''}>${icon(channel.icon, channel.tone)}<h3>${t(channel.title)}</h3><p>${t(channel.body)}</p><span class="text-link">${t(channel.action)} →</span></a>`).join('');
  return layout('contact', `${pageHeader(t('Open Channel · Recruiter & Engineering Inquiries'), t("Let's talk engineering."), t('Available for senior engineering roles, architectural reviews and AI-native delivery conversations. Direct channels below.'))}
    <section class="shell section-tight"><div class="contact-grid">${cards}</div><div class="contact-meta"><span class="mono-label">${t('Based in Rosario, Argentina (UTC-3) · Open to remote and hybrid roles.')}</span><a class="button button-light button-small" href="mailto:${email}">✉ ${t('Write an Email')}</a></div></section>`);
}

const modalContent = {
  mcp: { eyebrow: 'Deep Dive Specification', title: 'Agentic Dev Framework & MCP Suite', body: 'This system decouples AI code generation from passive completions, introducing stateful agents with deterministic tools registered via the Model Context Protocol. Type-safe diffs are verified before file writes.', stat: '3.2x faster', statNote: 'Delivery cycle after MCP and SDD adoption.', code: 'import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";\n\nexport const mcp = new McpServer({\n  name: "enterprise-dev-agent",\n  version: "2.4.0"\n});' },
  auth: { eyebrow: 'High-Throughput Showcase', title: 'Microfrontend Auth Engine', body: 'A distributed authentication and biometric 2FA microfrontend embedded across business units without cross-origin iframe security penalties.', stat: '18ms', statNote: 'Target handshake latency.', code: 'Shared context bus: Web Worker Broker\nZero downtime rollout: Canary remote bundles\nProtocols: OIDC + PKCE + WebAuthn FIDO2' },
  sdd: { eyebrow: 'Specification-Driven Dev Pipeline', title: 'Multi-Agent Verification Architecture', body: 'Requirements documents become the single source of truth; generated code is transient and verified by specialist agent roles.', stat: '100%', statNote: 'Pass rate across the verification loop.', code: '1. Spec ingestion\n2. Synthesis agent\n3. Strict type linting\n4. Vitest sandbox\n5. Atomic commit' },
  qira: { eyebrow: 'Agri-Fintech Core', title: 'Qira Pagos Double-Entry Ledger', body: 'Real-time transactional flows support agricultural barter, invoice financing, multi-signature authorizations and automated reconciliation.', stat: 'ACID', statNote: 'Immutable ledger integrity.', code: 'POST /v2/ledger/journal-entry\nDebit: Supplier Escrow Account\nCredit: Grain Warrant Collateral Vault\nStatus: SETTLED_IMMUTABLE' },
  mobile: { eyebrow: 'React Native Multi-Tenant', title: 'White-Label Utility Mobile Architecture', body: 'A unified codebase powers customized utility and IoT applications through build-time configuration, runtime theme tokens and feature flags.', stat: '42+', statNote: 'Client builds from one architecture.', code: 'Dynamic brand palette injection\nOffline IoT telemetry sync\nZero-runtime-overhead asset loading' },
};

function openModal(id) {
  const item = modalContent[id];
  if (!item) return;
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `<div class="modal-header"><div><span class="mono-label cyan">${t(item.eyebrow)}</span><h2>${t(item.title)}</h2></div><button class="modal-close" type="button" aria-label="Close dialog">×</button></div><div class="modal-body"><p>${t(item.body)}</p><pre class="modal-code">${item.code}</pre><div class="modal-grid"><div class="modal-stat"><strong>${t(item.stat)}</strong><span>${t(item.statNote)}</span></div><div class="modal-stat"><strong class="cyan">${t('VERIFIED')}</strong><span>${t('Type-safe production guardrails')}</span></div></div></div>`;
  document.body.append(modal);
  backdrop.hidden = false;
  document.body.classList.add('modal-open');
  let escape;
  const close = () => { modal.remove(); backdrop.hidden = true; document.body.classList.remove('modal-open'); if (escape) document.removeEventListener('keydown', escape); };
  modal.querySelector('.modal-close').addEventListener('click', close);
  backdrop.onclick = close;
  modal.querySelector('.modal-close').focus();
  escape = (event) => { if (event.key === 'Escape') close(); };
  document.addEventListener('keydown', escape);
}

function translateStatic() {
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  document.documentElement.lang = currentLanguage;
  document.title = `Nicolás Costanza | ${t('Senior Engineer & AI Architect')}`;
  if (languageSelect) languageSelect.value = currentLanguage;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('visible'), 2400);
}

function applyTheme(theme = localStorage.getItem('portfolio-theme') || 'dark') {
  const nextTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('portfolio-theme', nextTheme);
  themeToggle.textContent = nextTheme === 'dark' ? '☼' : '☾';
  themeToggle.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.title = nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

function setLanguage(language) {
  currentLanguage = supportedLanguages.includes(language) ? language : 'en';
  localStorage.setItem('portfolio-language', currentLanguage);
  routeFromHash();
}

function bindInteractions() {
  document.querySelectorAll('[data-copy-email]').forEach((button) => button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(email); showToast(t('Email copied to clipboard')); } catch { showToast(email); }
  }));
  document.querySelectorAll('[data-open-modal]').forEach((button) => button.addEventListener('click', () => openModal(button.dataset.openModal)));
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('active', item === button));
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach((card) => card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter));
  }));
  document.querySelectorAll('[data-experience-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-experience-filter]').forEach((item) => item.classList.toggle('active', item === button));
    document.querySelectorAll('.experience-card').forEach((card) => { card.hidden = button.dataset.experienceFilter !== 'all' && card.dataset.company !== button.dataset.experienceFilter; });
  }));
  const search = document.querySelector('#skill-search');
  if (search) search.addEventListener('input', () => { const query = search.value.trim().toLowerCase(); document.querySelectorAll('.skill-card[data-tags]').forEach((card) => card.classList.toggle('is-hidden', Boolean(query) && !`${card.dataset.tags} ${card.textContent}`.toLowerCase().includes(query))); });
  const run = document.querySelector('#run-agent');
  const clear = document.querySelector('#clear-agent');
  const output = document.querySelector('#terminal-output');
  if (run && output) run.addEventListener('click', () => {
    const status = document.querySelector('#terminal-status');
    run.disabled = true;
    if (status) status.textContent = 'RUNNING';
    output.innerHTML = '';
    const lines = ['> Parsing specification contract...', '> Spawning generator agent...', '> Running TypeScript static validation...', '> Executing adversarial test matrix...', '> Security guardrails: OWASP Top 10 passed.', '> Agent loop complete. Commit proposal verified.'];
    lines.forEach((line, index) => window.setTimeout(() => { const div = document.createElement('div'); div.textContent = line; if (index === lines.length - 1) div.className = 'success'; output.append(div); if (index === lines.length - 1) { run.disabled = false; if (status) status.textContent = 'PASS'; } }, index * 420));
  });
  if (clear && output) clear.addEventListener('click', () => { output.innerHTML = `<div>${t('> Ready for instructions. Click "Execute Agent Loop" above.')}</div>`; const status = document.querySelector('#terminal-status'); if (status) status.textContent = 'READY'; });
  document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-view]').forEach((item) => item.classList.toggle('active', item === button)); document.querySelector(button.dataset.view === 'blueprints' ? '.blueprint' : '#skills-grid')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }));
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

function routeFromHash() {
  const raw = window.location.hash.slice(1).toLowerCase() || 'overview';
  const route = raw.split('/')[0];
  const routes = { overview, experience, 'ai-lab': aiLab, stack, education, contact };
  const targetRoute = routes[route] ? route : 'overview';
  app.innerHTML = routes[targetRoute]();
  document.querySelectorAll('[data-route]').forEach((link) => link.classList.toggle('active', link.dataset.route === targetRoute));
  bindInteractions();
  translateStatic();
  window.scrollTo({ top: 0, behavior: 'instant' });
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => { const open = mobileNav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
themeToggle.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
languageSelect.addEventListener('change', (event) => setLanguage(event.target.value));
window.addEventListener('hashchange', routeFromHash);
applyTheme();
routeFromHash();
