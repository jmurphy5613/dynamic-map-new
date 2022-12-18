import React, { useState, Fragment } from "react";
import { Sidebar, Tab } from "react-leaflet-sidebarv2";
import '../globals.css'

import SideComment from "./SideComment";
import "./Sidepanel.css";

function Sidepanel(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState("home");
    const [language, setLanguage] = useState("English");

    let comments = props.comments;

    const open = (id) => {
        if (selected === id && collapsed === false) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
            setSelected(id);
        }
    };

    return (
        <Sidebar
            id="sidebar"
            position="left"
            collapsed={collapsed}
            selected={selected}
            onOpen={(id) => open(id)}
            onClose={() => setCollapsed(true)}
            closeIcon={<img className="close" alt="" src="/icons/close.svg" />}
        >
            <Tab
                id="home"
                header="Home"
                icon={
                    selected !== "home" ? (
                        <img className="home" alt="" src="/icons/home.png" />
                    ) : (
                        <img
                            className="home"
                            alt=""
                            src="/icons/home_live.png"
                        />
                    )
                }
                active
            >
                {language === 'Spanish' ? 
                    <div>
                        <p>
                        </p>
                        <button
                            className="spanish button--primary"
                            onClick={() => setLanguage("English")}
                        >
                            in English
                        </button>
                        <p>
                        <i>traducción a través de Google Translate</i>
                        </p>
                        <h4>¡Bienvenido al segundo mapa comunitario del Plan integral de Medford!</h4>
                        <p>
                        Después de recibir sus comentarios sobre el primer mapa de la comunidad, tuvimos una serie de reuniones para analizar nuestro análisis de sus comentarios y sugerencias. ¡Identificamos <b>5 temas clave</b> en sus comentarios y ahora queremos saber de usted nuevamente!
                        </p>


                        <div className="infoType">
                            <img className="textIcon" src="/icons/climate.png" alt="" />
                            <p>
                                <b>Clima:</b> Usa el{" "}
                                <img
                                    className="inTextIcon climate"
                                    src="/icons/tool_add_climate.png"
                                    alt=""
                                />{" "}
                                para proponer ideas sobre el clima local.
                            </p>
                        </div>
                        <div className="infoType">
                            <img className="textIcon" src="/icons/equity.png" alt="" />
                            <p>
                                <b>Accesibilidad:</b> Use {" "}<img
                                    className="inTextIcon"
                                    src="/icons/tool_add_equity.png"
                                    alt=""
                                />{" "}
                                para identificar formas de hacer que Medford sea más equitativo.
                            </p>
                        </div>
                        <div className="infoType">
                            <img className="textIcon" src="/icons/vibrancy.png" alt="" />
                            <p>
                                <b>Vibrancia:</b> Use {" "}
                                <img
                                    className="inTextIcon"
                                    src="/icons/tool_add_vibrancy.png"
                                    alt=""
                                />{" "}
                                para identificar formas de hacer que Medford sea más vibrante.
                            </p>
                        </div>
                        
                        <div className="infoType">
                            <img className="textIcon" src="/icons/community.png" alt="" />
                            <p>
                                <b>Comunidad:</b> Use {" "}
                                <img
                                    className="inTextIcon"
                                    src="/icons/tool_add_community.png"
                                    alt=""
                                />{" "}
                                para identificar formas de apoyar a la comunidad de Medford.
                            </p>
                        </div>
                        
                        <div className="infoType">
                            <img className="textIcon" src="/icons/transparency.png" alt="" />
                            <p>
                                <b>Compromiso:</b> identifique las formas en que la ciudad puede comunicarse e involucrar al público utilizando {" "}
                                <img
                                    className="inTextIcon"
                                    src="/icons/tool_add_transparency.png"
                                    alt=""
                                />{" "}
                            </p>
                        </div>
                        <p>
                        Cada vez que coloque un pin, agregue un comentario para compartir lo que está pensando. Puedes agregar tantos pines como quieras.
                        </p>
                        <p>
                        Al hacer clic en "Publicar"("Post"), su icono y el comentario se agregarán al mapa. Puede cambiar sus comentarios hasta que cierre el mapa. Sea respetuoso, ya que todos pueden ver los comentarios que comparte.
                        </p>
                        <p>
                        ¡Lo más importante es que comparta este mapa con familiares y amigos que se preocupan por Medford!
                        </p>
                        <p>
                            <i>Si el mapa es difícil de usar o incompatible con su lector de pantalla, deje un mensaje en <a href="tel:781-393-2480">781-393-2480</a> y un miembro de nuestro equipo de planificación se comunicará con usted.</i>
                        </p>
                        <p>
                        <button
                            className="getStarted button--primary"
                            onClick={() => setCollapsed(true)}
                        >
                            ¡Empezar!
                        </button>
                        </p>
                        
                        
                    </div>
                    :
                    <div>
                         <p>
                        <button
                            className="spanish button--primary"
                            onClick={() => setLanguage("Spanish")}
                        >
                            en Español
                        </button>
                        </p>
                        <p>
                        </p>
                        <h4>Welcome to the second community map for the Medford Comprehensive Plan!</h4>
                        <p>
                        After receiving your feedback from the first community map, we had a series of meetings to discuss our analysis of your comments and suggestions. We identified <b>5 key themes</b> in your feedback and now we want to hear from you again!
                        </p>
                        <p>
                        Use the map to identify places in and around Medford that are important to you. Click to pick up an icon of one of the 5 key themes related to your comment from the sidebar menu. Click again to pin your icon on the map where it belongs and share your thoughts with us.
                        </p>


                        <div className="infoType">
                            <img className="textIcon" src="/icons/climate.png" alt="" />
                            <p>
                                <b>Climate:</b> Use the{" "}
                                <img
                                    className="inTextIcon climate"
                                    src="/icons/tool_add_climate.png"
                                    alt=""
                                />{" "}
                                to propose local climate ideas.
                            </p>
                        </div>
                        <div className="infoType">
                            <img className="textIcon" src="/icons/equity.png" alt="" />
                            <p>
                                <b>Accessibility:</b> Use the {" "}<img
                                    className="inTextIcon"
                                    src="/icons/tool_add_equity.png"
                                    alt=""
                                />{" "}
                                to identify ways to make Medford more equitable.
                            </p>
                        </div>
                        <div className="infoType">
                            <img className="textIcon" src="/icons/vibrancy.png" alt="" />
                            <p>
                                <b>Vibrancy:</b> Use the{" "}
                                <img
                                    className="inTextIcon"
                                    src="/icons/tool_add_vibrancy.png"
                                    alt=""
                                />{" "}
                                to identify ways to make Medford more vibrant.
                            </p>
                        </div>
                        
                        <div className="infoType">
                            <img className="textIcon" src="/icons/community.png" alt="" />
                            <p>
                                <b>Community:</b> Use the{" "}
                                <img
                                    className="inTextIcon"
                                    src="/icons/tool_add_community.png"
                                    alt=""
                                />{" "}
                                to identify ways to support Medford's community.
                            </p>
                        </div>
                        
                        <div className="infoType">
                            <img className="textIcon" src="/icons/transparency.png" alt="" />
                            <p>
                                <b>Engagement:</b> Identify ways the city can communicate with and engage the public using {" "}
                                <img
                                    className="inTextIcon"
                                    src="/icons/tool_add_transparency.png"
                                    alt=""
                                />{" "}
                            </p>
                        </div>
                        <p>
                        Each time you place a pin, add a comment to share what you are thinking. You can add as many pins as you want.
                        </p>
                        <p>
                        When you click “Post” your icon and comment will be added to the map. You can change your comments until you close the map. Please be respectful, as everyone can see the comments you share.
                        </p>
                        <p>
                        Most importantly, please share this map with family and friends who care about Medford!
                        </p>
                        <p>
                            <i>If the map is difficult to use or incompatible with your screen reader, please leave a message at <a href="tel:781-393-2480">781-393-2480</a>, and a member of our planning team will contact you.</i>
                        </p>
                <p>
                <button
                    className="getStarted button--primary"
                    onClick={() => setCollapsed(true)}
                >
                    Get Started
                </button>
                </p>
                
               
                </div>
                }
                
            </Tab>

            <Tab
                id="infoTab"
                header="About the Plan"
                icon={
                    selected !== "infoTab" ? (
                        <img
                            className="info"
                            alt=""
                            src="/icons/new_info.png"
                        />
                    ) : (
                        <img
                            className="info"
                            alt=""
                            src="/icons/info_live.png"
                        />
                    )
                }
            >
                <p>
                        <img
                            className="Logo"
                            alt="Medford_gif"
                            src="/icons/stickers.gif"
                            width="300"
                            class="center"
                        />
                </p>
                {language === 'Spanish' ? 
                    <div>
                        <button
                            className="spanish button--primary"
                            onClick={() => setLanguage("English")}
                        >
                            in English
                        </button>
                        <p>

                        </p>
                        <p>
                        <i>traducción a través de Google Translate</i>
                        </p>
                        <p>
                        Medford Comprehensive Plan es un plan impulsado por la comunidad para la ciudad de Medford. Invitamos a todos los miembros de la comunidad a que nos ayuden a comprender los recursos, los desafíos, las oportunidades y las cualidades únicas actuales de Medford, a fin de moldear mejor su futuro.
                        </p>
                        <p>
                        Medford es una comunidad de residentes, trabajadores, dueños de negocios, estudiantes y visitantes. Como esfuerzo de colaboración, el plan Medford reflejará nuestras historias, culturas, valores y objetivos compartidos; en otras palabras, nuestras esperanzas y sueños para Medford.
                        </p>
                        <p>
                        Al agregar sus propias historias, ideas, inquietudes y lugares únicos al mapa, puede participar en la configuración de este plan para el futuro de Medford.
                        </p>
                        <p>
                        Más información sobre el Medford Comprehensive Plan está disponible en: {" "}
                        </p>
                        <p>
                            <b>
                                <a
                                    target="_blank"
                                    href="https://www.medfordcompplan.org/"
                                >
                                    www.medfordcompplan.org 
                                </a>
                            </b>
                        </p>
                        
                    </div>
                :
                    <div>
                        
                        <button
                            className="spanish button--primary"
                            onClick={() => setLanguage("Spanish")}
                        >
                            en Español
                        </button>
                        <p>
                        </p>
                        <p>
                        The Medford Comprehensive Plan is a community-driven plan for the City of Medford. We invite all members of the community to help us understand Medford’s present resources, challenges, opportunities, and unique qualities—in order to better shape its future.
                        </p>
                        <p>
                        Medford is a community of residents, workers, business owners, students, and visitors. As a collaborative effort, the Medford plan will reflect our shared histories, cultures, values, and goals—in other words, our hopes and dreams for Medford.
                        </p>
                        <p>
                        By adding your own stories, ideas, concerns, and unique places to the Map, you can participate in shaping this plan for Medford’s future.
                        </p>                
                        <p>
                        More information about the Medford Comprehensive Plan is available at: {" "}
                        </p>
                        <p>
                            <b>
                                <a
                                    target="_blank"
                                    href="https://www.medfordcompplan.org/"
                                >
                                    www.medfordcompplan.org
                                </a>
                            </b>
                        </p>
                
                </div>
                }
                
            </Tab>

            <Tab
                id="commentsTab"
                header="Comments"
                icon={
                    selected !== "commentsTab" ? (
                        <img
                            className="comments"
                            alt=""
                            src="/icons/side_comments.png"
                        />
                    ) : (
                        <img
                            className="comments"
                            alt=""
                            src="/icons/comments_live.png"
                        />
                    )
                }
            >
                {comments &&
                    Object.keys(comments).length > 0 &&
                    Object.keys(comments).map((id) => (
                        <Fragment key={id}>
                            {!comments[id].hidden && (
                                <SideComment
                                    key={id}
                                    comment={{ id: id, ...comments[id] }}
                                    map={props.map}
                                    latlng={{
                                        lat: props.points[id].lng,
                                        lng: props.points[id].lat,
                                    }}
                                ></SideComment>
                            )}
                        </Fragment>
                    ))}
            </Tab>
        </Sidebar>
    );
}

export default Sidepanel;
