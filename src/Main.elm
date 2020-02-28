module Main exposing (..)

import Browser
import Html exposing (Html, div)
import Html.Attributes exposing (id)

import Pages.Community exposing (..)


type alias Model =
    { data : Int, graph : String }


init : () -> ( Model, Cmd msg )
init _ =
    ( Model 0 ""
    , Cmd.none
    )


view : Model -> Html msg
view model =
    div [ id "elm__container" ] [ Pages.Community.view ]


update : msg -> Model -> ( Model, Cmd msg )
update msg model =
    ( model
    , Cmd.none
    )
            

subscriptions : model -> Sub msg
subscriptions _ =
    Sub.none


main : Program () Model msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
