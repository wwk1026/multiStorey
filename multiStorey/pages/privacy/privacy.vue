<template>
	<!-- 页面主体 -->
	<view class="container">

		<!-- 用户服务声明 -->
		<view class="service">
			<view class="number">一、用户服务声明</view>
			<view class="text">1.本小程序是一个停车场停车小程序，旨在为用户提供便捷的停车服务。</view>
			<view class="text">2.我们将竭尽所能，保障您的个人信息安全，防止信息泄露、损毁或丢失。</view>
			<view class="text">3.我们承诺遵守有关法律法规和行业标准，确保您的权益不受侵犯。</view>
		</view>

		<!-- 隐私声明 -->
		<view class="privacy">
			<view class="number">二、隐私声明</view>
			<view class="text">1.我们收集的个人信息仅限于您在使用本小程序时需要提供的信息，包括但不限于手机号码、车牌号等。</view>
			<view class="text">2.我们会采取合理的安全措施，保障您的个人信息不受未经授权的访问、使用、修改或泄露。</view>
			<view class="text">3.我们承诺不向第三方出售或提供您的个人信息，除非得到您的明确授权或法律法规要求。</view>
			<view class="text">4.您有权随时查看、修改、删除您的个人信息。如有需要，您可以通过本小程序联系我们。</view>
			<view class="text">5.未成年人在使用本小程序时，应该得到父母或监护人的同意。</view>
			<view class="text">6.我们可能会不定期地更新本隐私声明，一旦更新，我们将通过适当的方式通知您。在更新后，您继续使用本小程序即表示您同意更新后的隐私声明。</view>
		</view>

		<!-- 其他条款 -->
		<view class="terms">
			<view class="number">三、其他条款</view>
			<view class="text">1.我们拥有本小程序及其相关服务的知识产权，包括但不限于版权、商标、专利和商业秘密等。未经我们许可，任何人不得以任何形式使用、复制、传播、出售、转让或其他非法使用。</view>
			<view class="text">2.本声明的解释、效力及争议的解决均适用中华人民共和国法律，如双方就本声明的内容或其执行发生争议，应协商解决；协商不成的，任何一方均可向有管辖权的人民法院提起诉讼。</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	/* 容器样式 */
	.container {
		margin: 20px;
		background-color: #f5f5f5;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0px 0px 5px #888;
	}

	/* 标题样式 */
	.number {
		font-size: 20px;
		font-weight: bold;
		margin-bottom: 10px;
	}

	/* 文本样式 */
	.text {
		font-size: 16px;
		margin-bottom: 5px;
		line-height: 1.5;
	}

	/* 服务声明样式 */
	.service {
		margin-bottom: 20px;
	}

	/* 隐私声明样式 */
	.privacy {
		margin-bottom: 20px;
	}

	/* 小标题样式 */
	.other {
		font-size: 18px;
		font-weight: bold;
		margin-bottom: 10px;
	}
</style>
