<template>
    <div v-if="widget && showWidget" data-widget="widget" :id="widget.id" :class="'nuxpresso-widget-' + widget.id + ' ' + widget.class" :style="calcFull(widget.id)">

        <i :class="'z-50 material-icons cursor-pointer absolute top-0 right-0 '  + theme.link_fg.tw_color" @click="showWidget=!showWidget" v-if="widget.class ? widget.class.indexOf('nuxpresso-modal') > -1 : false">highlight_off</i>
        
        <!-- display widget title if enabled -->        
        <h3 class="nuxpresso-widget-title" v-if="widget && widget.title">{{ widget.title }}</h3>
        <transition name="fade">
            <!-- widget component wrapper -->
            <div v-if="widget" :class="'nuxpresso-widget-wrapper ' + wrapper">
                
                <!-- loop thru widget components -->
                <div v-for="(comp,i) in widget.component" :data-component="comp.__component" :key="'component_' + i" :class="widgetClass(comp.__component)">
                    
                    <!-- features (to maintain compatibility with old component) -->
                    <div :class="'flex flex-col md:flex-row nuxpresso-widget-' + $slugify(widget.name) + '-component'" v-if="comp['__component']==='widgets.features'">
                        <img v-if="comp.image" :src="comp.image.url" />
                        <i v-if="comp.material_icon" style="font-size:3rem;" class="material-icons">{{comp.material_icon}}</i>
                        <h5>{{comp.title}}</h5>
                        {{comp.subtitle}}
                        <a v-if="comp.link_url && comp.button" :href="comp.link_url"><button>{{comp.button_text}}</button></a>
                    </div>
                    
                    <!-- cta -->
                    <div :id="'nuxpresso-widget-' + widget.id" 
                        :class="'nuxpresso-widget nuxpresso-widget-cta nuxpresso-widget-' + $slugify(widget.name) + ' ' + $colorClass('bg',comp.background.color,comp.background.density) + ' ' + widget.component_class" 
                        v-if="comp['__component'] === 'widgets.cta'">
                        <h5>{{comp.title}}</h5>
                        {{ comp.subtitle }}
                        <a v-if="comp.link_url && comp.button" :href="comp.link_url"><button :class="btn_class">{{comp.button_text}}</button></a>
                    </div>

                    <!-- advanced-features -->
                    <div :id="'nuxpresso-widget-' + widget.id" :class="'nuxpresso-widget nuxpresso-widget-' + $slugify(widget.name)" :style="calcFull(widget.id)" v-if="comp['__component']==='widgets.advanced-features'">
                        <div class="nuxpresso-flex-row">
                            
                                <box v-for="(feature,f) in comp.features_item" :key="feature.title" class="nuxpresso-advanced-fatures nuxpresso-col " :classe="widget.component_class + ' nuxpresso-widget-' + $slugify(widget.name) + '-component'">

                                    <img v-if="feature.image" :src="feature.image.url" class="nuxpresso-box-image" slot="line_1" />
                                    <i slot="line_1" v-if="feature.material_icon" style="font-size:3rem;" class="nuxpresso-box-icon material-icons">{{feature.material_icon}}</i>
                                    
                                    <h5 class="nuxpresso-box-title" slot="line_2">{{feature.title}}</h5>
                                    <h3 class="nuxpresso-box-price" slot="line_3" v-if="feature.price">
                                        <span v-if="feature.sale" class="line-through text-xs">{{feature.price}}</span>
                                        <span v-else>{{feature.price}}</span>
                                        <span v-if="feature.sale" class="nuxpresso-box-sale">{{features.sale}}</span>
                                    </h3>
                                    
                                    <p class="nuxpresso-box-subtitle" slot="line_3">{{feature.subtitle}}</p>
                                    
                                    <p class="nuxpresso-box-multiline" slot="line_4" :key="'descr_' + comp.id + '_' + l" v-for="(line,l) in multiline(feature.description)">{{line}}</p>

                                    <div v-if="feature.button"  class="nuxpresso-box-button" slot="line_5">
                                        <nuxt-link 
                                            :to="feature.link"
                                            :key="'button_' + $slugify(feature.name)">
                                            <button :class="btn_class">{{ feature.button }}</button>
                                        </nuxt-link>
                                    </div>
                                </box>
                                
                        </div>    
                    </div>
                    
                
                    <!--- multibox --->
                    <nuxpresso-multi-box  v-if="comp['__component']==='widgets.multi-box'" :widget="widget" :component="comp"/>

                    <!-- logo -->
                    <div v-if="comp['__component']==='widgets.logo'">
                        <NuxpressoLogo :options="comp" :classe="widget.component_class"/>
                    </div>

                    <!-- map -->
                    <div v-if="comp['__component']==='widgets.map'">
                        <NuxpressoMap :address="comp.address"/>
                    </div>

                    <!-- button -->
                    <a v-if="comp['__component']==='widgets.button'" :href="comp.link_url">
                        <button :class="'nuxpresso-widget nuxpress-button-' + $slugify(widget.name) + btn_class">{{comp.text}}</button>
                    </a>
                    <!-- slider -->
                    <Slider v-if="comp['__component']==='widgets.slider'" :slider="comp" :options="comp.image"/>

                    <!-- form -->
                    <NuxpressoForm  :widget="comp" :class="widget.class" v-if="comp['__component'].indexOf('forms.form') > -1"/>

                    <!-- articles loop -->
                    <div v-if="comp['__component']==='widgets.articles-list'" :load="lastArticles(comp)">
                        <Loop v-if="articles" :articles="articles" />
                    </div>

                    <!-- articles selection -->
                    <div v-if="comp['__component']==='widgets.articles-selection'">
                        <Loop v-if="comp.Article" :articles="setArticlesSelection" />
                    </div>

                    <!-- slider-pro -->
                    <div v-if="comp['__component']==='widgets.slider-pro'">
                        <NuxpressoSliderPro :name="widget.name" :slider="comp" :slides="comp.slides"/>
                    </div>

                    <!-- social -->
                    <div v-if="comp['__component']==='widgets.social-share'">
                        <NuxpressoSocial :social="comp.social_share" :orientation="comp.vertical" :titles="comp.display_name"/>
                    </div>
                    
                    <!-- video -->
                    <div v-if="comp['__component']==='widgets.video'">
                        <nuxpresso-video :video="comp.video_url" :size="comp.video_size" :id="'nuxpresso-video-' + widget.id" :classe="comp.css"/>
                    </div>

                    <!-- portfolio -->
                    <div v-if="comp['__component']==='widgets.portfolio-container'">
                        <nuxpresso-portfolio :portfolio="comp"/>
                    </div>

                    <!-- timeline -->
                    <nuxpresso-timeline v-if="comp['__component']==='widgets.timeline'" :timeline="comp"/>

                    <!-- new call to action -->
                    <nuxpresso-cta v-if="comp['__component']==='widgets.call-to-action'" :cta="comp"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Slider from '@/components/widgets/Slider'
import NuxpressoForm from '@/components/widgets/Form'
import Loop from '@/components/widgets/Loop'
import Box from '@/components/ui/InfoBox'
import NImage from '@/components/widgets/Image'
import NuxpressoMap from '@/components/widgets/Map'
import NuxpressoSliderPro from '@/components/widgets/SliderPro'
import NuxpressoLogo from '@/components/widgets/Logo'
import NuxpressoSocial from '@/components/widgets/SocialShare'
import NuxpressoMultiBox from '@/components/widgets/MultiBox'
import NuxpressoVideo from '@/components/widgets/Video'
import NuxpressoPortfolio from '@/components/widgets/Portfolio'
import NuxpressoTimeline from '@/components/widgets/Timeline'
import NuxpressoCta from '@/components/widgets/CallToAction'

import { mapState } from 'vuex'
var timer,timing
export default {
    name: 'NuxpWidget',
    data:()=>({
        showWidget: false,
        wrapper: '' ,
        articles: null
    }),
    computed:{
        ...mapState ( ['widgets','theme'] ),
        widget(){
            if ( !this.$attrs.timer ) { this.showWidget = true }
            return this.$attrs.widget
            //return this.$attrs.id ? this.widgets.filter ( w => { return w.id === parseInt(this.$attrs.id) })[0] : null
        },
        fullwidth(){
            return this.widget.fullwidth ? '' : ' nuxpresso-boxed'
        },
        setArticlesSelection(){
            return this.widget.component[0].Article.map ( article => { return article.article } )
        },
        
        btn_classe(){
            let classe = this.theme.buttons_fg ? ' ' + this.theme.buttons_fg.tw_color : ' '
            classe += this.theme.buttons_bg ? ' ' + this.theme.buttons_bg.tw_color : ' '
            classe += ' ' + this.theme.buttons_bg.css +  ' ' + this.theme.buttons_fg.css
            return classe
        },

    },
    components: { 
        Slider , 
        NuxpressoForm , 
        Loop , 
        Box , 
        NImage , 
        NuxpressoMap , 
        NuxpressoSliderPro , 
        NuxpressoLogo , 
        NuxpressoSocial , 
        NuxpressoMultiBox,
        NuxpressoVideo,
        NuxpressoPortfolio,
        NuxpressoTimeline,
        NuxpressoCta
    },
    mounted(){
        if ( this.$attrs.timer ){
            this.showWidget = false
            if ( process.client ){
                timer = window.setTimeout(()=>{ 
                    this.showWidget = true
                }, parseInt(this.$attrs.timer))
            }
        }
    },     
    methods:{
        calcFull(id){
            if ( process.client ){
                if ( this.widget.fullwidth ){
                    let el = document.getElementById('template')
                    //let el = document.querySelector ( '.nuxpresso-widget-' + id )
                    
                    //if ( el ){
                    //    return 'margin-left:-' + el.offsetLeft + 'px;margin-right:-' + el.offsetLeft + 'px;'
                        //return 'margin-left:0;margin-right:-' + el.offsetLeft + 'px;'
                    //}
                    
                }
                return ''
            }
            return ''

        },
        widgetClass(component){
            this.wrapper = 'nuxpresso-component-' + component.split('.')[1] + '-wrapper'
            return 'nuxpresso-component-' + component.split('.')[1]
        },
        lastArticles(component){
            if ( !this.articles ){
                let vm = this
                let sort = component.last ? 'DESC' : 'ASC'
                let limit = component.limit 
                this.$axios.$get ( 'articles?_sort=updated_at:' + sort + '&_limit=' + limit).then ( data => {
                    return data
                }).then ( data => {
                    vm.articles = data
                })
            }
        },
        multiline(text){
            if ( text){
                return text.split('\n')
            }
            return ''
        },
        isTimer(classe){
            if ( !classe ) return true
            let show = false
            if ( classe && classe.indexOf('nuxpresso-timer') > -1 ){
                let a = classe.split(' ')
                a.forEach ( c => {
                    if ( c.indexOf ( 'nuxpresso-timer') > -1 ){
                        timing = c.split('-').length > 2 ? c.split('-')[2] : 1000
                        if ( process.client ){
                            timer = window.setTimeout(()=>{ 
                                this.showWidget = true
                            }, parseInt(timing))
                        }
                    }
                })
            } else {
                return true
            }
        },
        clearTimer(){
            if ( process.client ){
                this.showWidget = false
                window.clearTimeout( timer )
            }
        }
    },
    watch:{
        showWidget(v){
            if ( process.client && this.$attrs.timer ){
                if ( v ) window.clearTimeout( timer )
                if ( this.widget.class ){
                    this.widget.class.replace ( 'nuxpresso-timer' , '')
                    console.log ( 'showWidget=>' , v , timer )
                }
            }
        }
    }
}
</script>