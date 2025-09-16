import { useEffect } from 'react';
import { Config, OAuthList, Auth, WidgetEvents, OAuthListInternalEvents, ConfigResponseMode, ConfigSource, OAuthName } from '@vkid/sdk';
import { useNavigate } from 'react-router-dom';

interface AuthSuccessData {
    access_token: string;
    expires_in: number;
    user_id: number;
    email?: string;
}

interface LoginSuccessPayload {
    code: string;
    device_id: string;
}

function Entrance() {
    const navigate = useNavigate();

    useEffect(() => {
        // Инициализация конфигурации VK ID
        Config.init({
            app: 54140536, // Мой ID приложения
            redirectUrl: 'https://from-sochi.github.io/OAuth_Test_App/', // Используем точный redirect URL из настроек VK
            responseMode: ConfigResponseMode.Callback,
            source: ConfigSource.LOWCODE,
            scope: 'email', // Запрашиваем email пользователя
        });

        const container = document.getElementById('vkid-container');
        if (!container) return;

        container.innerHTML = '';

        const oAuth = new OAuthList();

        oAuth.render({
            container: container,
            oauthList: [OAuthName.VK],
        })
            .on(WidgetEvents.ERROR, (error: any) => {
                console.error('Ошибка авторизации VK ID:', error);
            })
            .on(OAuthListInternalEvents.LOGIN_SUCCESS, (payload: LoginSuccessPayload) => {
                console.log('Получен код авторизации:', payload.code);

                // Обмен кода на access token
                Auth.exchangeCode(payload.code, payload.device_id)
                    .then((data: AuthSuccessData) => {
                        console.log('Успешная авторизация:', data);
                        localStorage.setItem('vk_token', data.access_token);
                        localStorage.setItem('vk_user_id', data.user_id.toString());

                        if (data.email) {
                            localStorage.setItem('vk_email', data.email);
                        }

                        // alert('Авторизация прошла успешно!');

                        window.location.href = 'https://from-sochi.github.io/STAR-WARS/';


                    })
                    .catch((error: any) => {
                        console.error('Ошибка обмена кода на токен:', error);
                        alert('Ошибка авторизации: ' + error.message);
                    });
            });

        return () => {
            // Очистка при размонтировании компонента
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [navigate]);

    return (
        <div style={{ padding: '20px', margin: 'auto', minWidth: '300px', maxWidth: '600px' }}>
            <h2>Вход через VK</h2>

            <div id="vkid-container"></div>

            <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
                <p>App ID: 54140536</p>
            </div>
        </div>
    );
}

export default Entrance;
